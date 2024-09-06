import React, { useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import '../styles/PdfViewer.css';
import Loading from './Loading';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ link }) => {
  const pdfCont = useRef(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingHidden, setLoadingHidden] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }) => {
    pdfCont.current.classList.remove('hidden');
    setLoadingHidden(true);
    setNumPages(numPages);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, numPages));
  };

  return (
    <>
      <Loading currentlyHidden={loadingHidden} />
      <div ref={pdfCont} className={`pdf-viewer-wrapper ${loadingHidden ? "" : "hidden"}`}>
        <div className="pdf-viewer-container">
          <Document
            file={link}
            onContextMenu={(e) => e.preventDefault()}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <div className="pdf-page-container">
              <Page pageNumber={currentPage} />
              <div className="pdf-controls">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage <= 1}
                  className="control-button"
                >
                  Previous Page
                </button>
                <span className="page-counter">
                  Page {currentPage} of {numPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= numPages}
                  className="control-button"
                >
                  Next Page
                </button>
              </div>
            </div>
          </Document>
        </div>
      </div>
    </>
  );
};

export default PdfViewer;
