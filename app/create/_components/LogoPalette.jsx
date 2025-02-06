import React, { useState } from 'react'
import HeadingDescription from './HeadingDescription'
import Lookup from '../../_data/Lookup'
import Colors from '../../_data/Colors'
import { Palette } from 'lucide-react'

function LogoPalette({ onHandelInputChange, formData }) { // Accepting the function as a prop
  const [selectedOption, setSelectedOption] = useState(formData?.palette)

  return (
    <div>
      <HeadingDescription
        title={Lookup.LogoColorPaletteTitle}
        description={Lookup.LogoColorPaletteDesc}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
        {Colors.map((paletteItem, index) => (
          <div
            key={index}
            className={`flex p-1.5 cursor-pointer ${selectedOption === paletteItem.name ? 'border rounded-lg border-primary border-2' : ''}`}
          >
            {paletteItem?.colors.map((item, colorIndex) => (
              <div
                key={colorIndex}
                className="h-24 w-full cursor-pointer"
                onClick={() => {
                  setSelectedOption(paletteItem.name) // Correct reference
                  onHandelInputChange && onHandelInputChange(paletteItem.name) // Ensure function exists before calling
                }}
                style={{
                  backgroundColor: item,
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoPalette
