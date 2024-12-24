import React from 'react';


const Footer = ({ currentPage, totalPages, onPageChange }) => (
    <div className="footer">
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Назад
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
                key={page}
                onClick={() => onPageChange(page)}
                className={currentPage === page ? 'active' : ''}
            >
                {page}
            </button>
        ))}
        <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Вперед
        </button>
    </div>
);

export default Footer;