import React, { useRef } from 'react'
import Image from 'next/image'
// import Background from '../../../../../../../'
import { useScroll, useTransform, motion } from 'framer-motion'

export default function Intro() {
  const container = useRef()
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '150vh'])

  return (
    <div className="h-svh overflow-hidden">
      <motion.div style={{ y }} className="relative h-lvh">
        <Image
          src="/images/intro.jpg"
          fill
          alt="image"
          unoptimized={true}
          style={{ objectFit: 'cover' }}
        />
        <a
          href="#cta"
          className="text-5xl text-white absolute bottom-[10%] right-[5%] transform transition-transform duration-500 ease-out hover:scale-125 hover:-rotate-180"
        >
          <span className="sr-only">Call to action</span>
          <svg
            width="80"
            height="80"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M73.3613 19.8386C84.3297 13.3666 97.5498 11.9588 109.607 15.9789V15.9789C113.503 17.2782 117.568 18.0237 121.674 18.1934V18.1934C134.36 18.7176 146.258 24.7712 154.193 34.6694V34.6694C156.766 37.8789 159.798 40.7394 163.155 43.1159V43.1159C173.543 50.4698 180.292 62.0253 181.651 74.697V74.697C182.092 78.8061 183.107 82.8675 184.653 86.6968V86.6968C189.434 98.5343 188.924 111.911 183.241 123.37V123.37C181.405 127.071 180.084 131.043 179.33 135.103V135.103C177.005 147.615 169.384 158.649 158.466 165.195V165.195C154.935 167.313 151.699 169.929 148.885 172.937V172.937C140.195 182.228 127.883 187.353 115.191 186.919V186.919C111.081 186.779 106.969 187.217 102.978 188.22V188.22C90.6522 191.318 77.5572 188.898 67.1509 181.641V181.641C63.7814 179.291 60.0793 177.414 56.1904 176.086V176.086C44.1677 171.982 34.4485 162.796 29.6073 151.046V151.046C28.0367 147.234 25.929 143.627 23.3742 140.394V140.394C15.4634 130.382 12.2199 117.405 14.4667 104.82V104.82C15.1936 100.748 15.3527 96.5618 14.9406 92.4496V92.4496C13.67 79.7685 17.9002 67.0438 26.5519 57.6625V57.6625C29.3479 54.6307 31.7262 51.1941 33.5844 47.5127V47.5127C39.3148 36.1594 49.7105 27.7317 62.0118 24.5467V24.5467C65.994 23.5157 69.8163 21.9304 73.3613 19.8386V19.8386Z"
              fill="#1EA8FF"
            />
            <ellipse
              cx="99.8357"
              cy="101.766"
              rx="8.43237"
              ry="8.86528"
              fill="#D7DADB"
            />
            <rect
              width="34.4442"
              height="52.4865"
              rx="17.2221"
              transform="matrix(0.702469 0.711715 -0.702469 0.711715 141.309 32.9185)"
              fill="#D7DADB"
            />
            <path
              d="M95.0161 54.1334C100.274 62.0315 98.1862 72.7739 90.3525 78.1273V78.1273C82.5188 83.4807 71.9059 81.4179 66.6478 73.5199L56.5314 58.3243C51.2733 50.4263 53.3613 39.6839 61.1949 34.3305V34.3305C69.0286 28.9771 79.6416 31.0399 84.8997 38.9379L95.0161 54.1334Z"
              fill="#D7DADB"
            />
            <rect
              width="34.66"
              height="52.1556"
              rx="17.33"
              transform="matrix(-0.137399 -0.990516 0.990014 -0.140969 28.9609 131.382)"
              fill="#D7DADB"
            />
            <path
              d="M129.32 135.122C120.758 130.892 117.176 120.487 121.318 111.882V111.882C125.46 103.277 135.759 99.7316 144.32 103.962L160.181 111.8C168.743 116.031 172.325 126.436 168.183 135.04V135.04C164.041 143.645 153.743 147.191 145.181 142.96L129.32 135.122Z"
              fill="#D7DADB"
            />
            <path
              d="M77.5527 140.287C78.5278 130.887 86.9364 124.078 96.3338 125.078V125.078C105.731 126.079 112.559 134.511 111.584 143.911L109.665 162.409C108.689 171.809 100.281 178.618 90.8834 177.617V177.617C81.4861 176.617 74.6585 168.185 75.6337 158.785L77.5527 140.287Z"
              fill="#D7DADB"
            />
          </svg>
        </a>
      </motion.div>
    </div>
  )
}
