import { useState } from 'react';

export const usePagination = (initialPage = 1) => {
    const [currentPage, setCurrentPage] = useState(initialPage);

    const nextPage = () => setCurrentPage((prev) => prev + 1);
    const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
    const goToPage = (page) => setCurrentPage(page);

    return { currentPage, nextPage, prevPage, goToPage };
};