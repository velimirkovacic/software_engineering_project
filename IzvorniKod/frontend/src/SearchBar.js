import React from 'react'

function SearchBar({ posts, setSearchResults }) {

    const handleSubmit = (e) => e.preventDefault()

    const handleSearchChange = (e) => {
        if (!e.target.value) return setSearchResults(posts)

        const resultsArray = posts.filter(post => post.title.includes(e.target.value))

        setSearchResults(resultsArray)
    }

    return (
        <div>
            <form className='search' onSubmit={handleSubmit}>
                <input className='search_input'
                    type='text'
                    id='search'
                    onChange={handleSearchChange}
                />
                <button className='search_button'>PRETRAŽI</button>
            </form>
        </div>
    )
}

export default SearchBar