import React from 'react'
import styles from './styles.module.css'
import { useRuntime } from 'vtex.render-runtime'
import { useSearchPage } from 'vtex.search-page-context/SearchPageContext'
import PaginationButton from './PaginationButton'

const SearchPagination = () => {
  try {
    const { query } = useRuntime()
    const { page: queryPage } = query
    const searchPage = useSearchPage()
    const pagesLimit = 4

    const page = queryPage ? parseInt(queryPage) : 1

    const getPaginationStart = (pagesCalculated: number) => {
      const pageLimit = (page + pagesLimit - 1)
      if(page === 1) return page
      if(pageLimit <= pagesCalculated) return page - 1
      return Math.max(1, pagesCalculated - pagesLimit + 1)
    }

    const { searchQuery, maxItemsPerPage } = searchPage
    if(!searchQuery?.recordsFiltered || !maxItemsPerPage || isNaN(searchQuery?.recordsFiltered) || isNaN(maxItemsPerPage)) throw new Error('')

    const numberOfPagesCalculated = Math.ceil(searchQuery.recordsFiltered / maxItemsPerPage)

    if(isNaN(numberOfPagesCalculated) || numberOfPagesCalculated < 2) throw new Error('')

    const initialPage = getPaginationStart(numberOfPagesCalculated)
    const finalPage = initialPage + pagesLimit - 1

    let paginationButtons = []
    if(page > 1) paginationButtons.push(<PaginationButton text={'<'} page={1} active={false} />)
    for(let i = initialPage; i <= finalPage; i++) {
      paginationButtons.push(<PaginationButton text={`${i}`} page={i} active={i === page} />)
    }
    if(page < finalPage) paginationButtons.push(<PaginationButton text={`>`} page={numberOfPagesCalculated} active={false} />)

    return <div className={styles.container}>
      {paginationButtons}
    </div>
  } catch(e) {
    return <></>
  }
}

export default SearchPagination