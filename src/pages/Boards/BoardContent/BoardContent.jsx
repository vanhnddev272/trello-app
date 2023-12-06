import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { cloneDeep } from 'lodash'
import {
  DndContext,
  // PointerSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  pointerWithin,
  rectIntersection,
  getFirstCollision,
  closestCenter
} from '@dnd-kit/core'
import { mapOrder } from '~/utils/sorts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Columns from './ListColumns/Column/Column'
import Card from '~/components/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'COLUMN_TYPE',
  CARD: 'CARD_TYPE'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  const touchSensor = useSensor(TouchSensor, { delay: 250, tolerance: 50 })
  const sensors = useSensors(mouseSensor, touchSensor)
  const [orderedColumns, setOrderedColumns] = useState([])
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  const lastOverId = useRef(null)

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (e) => {
    // console.log('Handle Drag Start: ', e)
    setActiveDragItemId(e?.active?.id)
    setActiveDragItemType(e?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(e?.active?.data?.current)

    if (e?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(e?.active?.id))
    }
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem =
        active.rect.current.translated &&
        active.rect.current.translated.top >
        over.rect.top + over.rect.height

      const modifier = isBelowOverItem ? 1 : 0

      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(
          newCardIndex,
          0,
          {
            ...activeDraggingCardData,
            columnId: nextOverColumn._id
          })
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }


      return nextColumns
    })

  }

  const handleDragOver = (e) => {
    // console.log('Handle Drag Over: ', e)

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    const { active, over } = e
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    const { id: overCardId } = over

    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)
    if (!activeColumn || !overColumn) return
    // console.log('activeColumn: ', activeColumn)
    // console.log('overColumn: ', overColumn)
    if (activeColumn._id !== overColumn._id) {
      // setOrderedColumns(prevColumns => {
      //   const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      //   let newCardIndex
      //   const isBelowOverItem =
      //     active.rect.current.translated &&
      //     active.rect.current.translated.top >
      //     over.rect.top + over.rect.height

      //   const modifier = isBelowOverItem ? 1 : 0

      //   newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      //   const nextColumns = cloneDeep(prevColumns)
      //   const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      //   const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      //   if (nextActiveColumn) {
      //     nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
      //     nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      //   }

      //   if (nextOverColumn) {
      //     nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
      //     nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, activeDraggingCardData)
      //     nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      //   }

      //   return nextColumns
      // })
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData
      )
    }
  }

  const handleDragEnd = (e) => {
    // console.log('Handle Drag End: ', e)
    const { active, over } = e

    if (!active || !over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over

      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return

      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        // setOrderedColumns(prevColumns => {
        //   const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        //   let newCardIndex
        //   const isBelowOverItem =
        //     active.rect.current.translated &&
        //     active.rect.current.translated.top >
        //     over.rect.top + over.rect.height

        //   const modifier = isBelowOverItem ? 1 : 0

        //   newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

        //   const nextColumns = cloneDeep(prevColumns)
        //   const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        //   const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        //   if (nextActiveColumn) {
        //     nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //     nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        //   }

        //   if (nextOverColumn) {
        //     nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        //     nextOverColumn.cards = nextOverColumn.cards.toSpliced(
        //       newCardIndex,
        //       0,
        //       {
        //         ...activeDragItemData,
        //         columnId: nextOverColumn._id
        //       })
        //     nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        //   }


        //   return nextColumns
        // })
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData
        )
      } else {
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

        const dndOrderCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          const targetColumns = nextColumns.find(column => column._id === overColumn._id)
          targetColumns.cards = dndOrderCards
          targetColumns.cardOrderIds = dndOrderCards.map(card => card._id)

          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && active.id !== over.id) {
      const oldColumnIndex = orderedColumns.findIndex(column => column._id === active.id)
      const newColumnIndex = orderedColumns.findIndex(column => column._id === over.id)

      const dndOrderColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
      setOrderedColumns(dndOrderColumns)
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const dropAnimation = {
    sideEffect: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  const collisionDetectionStrategy = useCallback((args) => {
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      return closestCorners({ ...args })
    }

    const pointerIntersections = pointerWithin(args)
    const intersections = !!pointerIntersections?.length ? pointerIntersections : rectIntersection(args)
    let overId = getFirstCollision(intersections, 'id')

    if (overId) {
      const checkColumn = orderedColumns.find(column => column._id === overId)
      if (checkColumn) {
        overId = closestCenter({
          ...args,
          droppableContainers: args.droppableContainers.filter(container => {
            return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
          })
        })[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: lastOverId.current }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd} >
      <Box sx={{
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        mt: '12px',
        p: '0 16px 12px'
      }}>
        {/* Column */}
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Columns column={activeDragItemData}/>}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
