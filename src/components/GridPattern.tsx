'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

function Circle({
  x,
  y,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof motion.path>, 'x' | 'y'> & {
  x: number
  y: number
}) {
  return (
    <motion.circle
      transform={`translate(${-33 * y + 156 * x} ${156 * y})`}
      cx="75"
      cy="75"
      r="75"
      {...props}
    />
  )
}

export function GridPattern({
  yOffset = 0,
  interactive = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  yOffset?: number
  interactive?: boolean
}) {
  let ref = useRef<React.ComponentRef<'svg'>>(null)
  let currentBlock = useRef<[x: number, y: number]>(undefined)
  let counter = useRef(0)
  let [hoveredBlocks, setHoveredBlocks] = useState<
    Array<[x: number, y: number, key: number]>
  >([])
  let staticBlocks = [
    [1, 1],
    [2, 2],
    [4, 3],
    [6, 2],
    [7, 4],
    [5, 5],
  ]

  useEffect(() => {
    if (!interactive) {
      return
    }

    function onMouseMove(event: MouseEvent) {
      if (!ref.current) {
        return
      }

      let rect = ref.current.getBoundingClientRect()
      let x = event.clientX - rect.left
      let y = event.clientY - rect.top
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        return
      }

      x = x - rect.width / 2 - 33
      y = y - yOffset
      x += Math.tan(33 / 156) * y
      x = Math.floor(x / 156)
      y = Math.floor(y / 156)

      if (currentBlock.current?.[0] === x && currentBlock.current?.[1] === y) {
        return
      }

      currentBlock.current = [x, y]

      setHoveredBlocks((blocks) => {
        let key = counter.current++
        let block = [x, y, key] as (typeof hoveredBlocks)[number]
        return [...blocks, block].filter(
          (block) => !(block[0] === x && block[1] === y && block[2] !== key),
        )
      })
    }

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [yOffset, interactive])

  return (
    <svg ref={ref} aria-hidden="true" {...props}>
      <svg x="50%" y={yOffset} strokeWidth="0" className="overflow-visible">
        {staticBlocks.map((block) => (
          <Circle key={`${block}`} x={block[0]} y={block[1]} />
        ))}
        {hoveredBlocks.map((block) => (
          <Circle
            key={block[2]}
            x={block[0]}
            y={block[1]}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1, times: [0, 0, 1] }}
            // onAnimationComplete={() => {
            //   setHoveredBlocks((blocks) =>
            //     blocks.filter((b) => b[2] !== block[2]),
            //   )
            // }}
          />
        ))}
      </svg>
    </svg>
  )
}
