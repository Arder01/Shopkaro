import React from 'react'

const SHopFiltering = ({filters,filltersState,setFilterState,clearFilters}) => {
  return (
    <div className='space-y-5 flex-shrink-0'>
      <h3>Filters</h3>
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Category</h4>
        <hr/>
        {
            filters.categories.map((category)=>(
                <label key = {category} className='capitalize cursor-pointer'>
                    <input type="radio" name = "category" id = "category" value = {category} checked = {filltersState.catagory===category}
                    onChange={(e) => setFilterState({
                        ...filltersState,category: e.target.value
                    })}/>
                    <span className='ml-1'>{category}</span>
                </label>
            ))
        }
      </div>
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>colors</h4>
        <hr/>
        {
            filters.colors.map((colors)=>(
                <label key = {colors} className='capitalize cursor-pointer'>
                    <input type="radio" name = "colors" id = "colors" value = {colors} checked = {filltersState.colors===colors}
                    onChange={(e) => setFilterState({
                        ...filltersState,colors: e.target.value
                    })}/>
                    <span className='ml-1'>{colors}</span>
                </label>
            ))
        }
      </div>
      <div className='flex flex-col space-y-2'>
        <h4 className='font-medium text-lg'>Price Range</h4>
        <hr/>
        {
            filters.priceRanges.map((range)=>(
                <label key = {range.label} className='capitalize cursor-pointer'>
                    <input type="radio" name = "priceRange" id = "priceRange" 
                    value = {`${range.min}-${range.max}`} 
                    checked = {filltersState.priceRange===`${range.min}-${range.max}`}
                    onChange={(e) => setFilterState({
                        ...filltersState,priceRange: e.target.value
                    })}/>
                    <span className='ml-1'>{range.label}</span>
                </label>
            ))
        }
      </div>
      <button onClick={clearFilters} className='bg-primary py-1 px-4 text-white rounded'>CLear All</button>
    </div>
  )
}

export default SHopFiltering
