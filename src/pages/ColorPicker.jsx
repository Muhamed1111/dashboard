import React, { useState } from 'react';
import { BlockPicker, SketchPicker } from 'react-color';

const ColorPicker = () => {
  const [color1, setColor1] = useState('#3498db');
  const [color2, setColor2] = useState('#3498db');

  return (
    <div className="dark:bg-secondary-dark-bg dark:text-white m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl">
      <h2 className="text-xl font-bold mb-6">Color Picker</h2>
      
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Inline Pallete */}
        <div>
          <h3 className="font-semibold mb-2">Inline Palette</h3>
          <SketchPicker
            color={color1}
            onChangeComplete={(color) => setColor1(color.hex)}
          />
          <p className="mt-2 text-sm text-gray-600">Selected: {color1}</p>
        </div>

        {/* Inline Picker */}
        <div>
          <h3 className="font-semibold mb-2">Inline Picker</h3>
          <SketchPicker
            color={color2}
            onChangeComplete={(color) => setColor2(color.hex)}
          />
          <p className="mt-2 text-sm text-gray-600">Selected: {color2}</p>
        </div>
      </div>

      {color1 && color2 && (
        <div className='flex flex-col  rounded md:flex-row text-white gap-none items-start'>
        <div className='mb-4 w-[30%] h-[40%] border-r-1 text-white border font-semibold' 
        style={{backgroundColor:color1}}>Pallete</div>
        <div className='w-[30%] h-[40%] border mb-4 font-semibold'
        style={{backgroundColor:color2}}>Picker</div>
        </div>
      )}  

    </div>
  );
};

export default ColorPicker
