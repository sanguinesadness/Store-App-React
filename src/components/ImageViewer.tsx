import React, { FC } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { BsTriangleFill } from 'react-icons/bs';
import Magnifier from 'react-magnifier';

export interface IndexedImage {
    //! index must be unique
    index: number;
    source: string;
}

interface ImageViewerProps {
    images: IndexedImage[];
    type: "switcher" | "image-only";
}

const ImageViewer: FC<ImageViewerProps> = ({ images, type }) => {
    const switcherRef = useRef<HTMLDivElement>(null);

    // Item height in CSS is 100ps by default (with margin)
    const switcherItemHeight = 100;

    const [selectedImage, setSelectedImage] = useState<IndexedImage>(images[0]);
    const [backArrowDisabled, setBackArrowDisabled] = useState<boolean>(false);
    const [forwardArrowDisabled, setForwardArrowDisabled] = useState<boolean>(false);

    const isImageSelected = (src: string) => selectedImage.source === src;

    const updateCarouselArrows = () => {
        setBackArrowDisabled(selectedImage.index === 0);
        setForwardArrowDisabled(selectedImage.index === images.length - 1);
    }

    const scrollBack = () => {
        if (!switcherRef.current) {
            return;
        }

        setPrevImage();

        switcherRef.current.scrollTo({
            top: switcherRef.current.scrollTop - switcherItemHeight,
            behavior: "smooth"
        });
    }

    const scrollForward = () => {
        if (!switcherRef.current) {
            return;
        }

        setNextImage();

        switcherRef.current.scrollTo({
            top: switcherRef.current.scrollTop + switcherItemHeight,
            behavior: "smooth"
        });
    }

    const setNextImage = () => {
        if (selectedImage.index >= images.length - 1) {
            return;
        }

        setSelectedImage(images[selectedImage.index + 1]);
    }
    
    const setPrevImage = () => {
        if (selectedImage.index < 1) {
            return;
        }

        setSelectedImage(images[selectedImage.index - 1]);
    }

    useEffect(() => {
        updateCarouselArrows();
    }, [selectedImage]);

    useEffect(() => {
        setSelectedImage(images[0]);
    }, [images]);

    return (
        <div className={`image-viewer ${type}`}>
            {
                type === "switcher" ? 
                    <>
                        <div className="carousel">
                            <span className={`back-arrow__wrapper ${backArrowDisabled ? "disabled" : ""}`}
                                onClick={scrollBack}>
                                <BsTriangleFill className="arrow" />
                            </span>
                            <div className="switcher" ref={switcherRef}>
                                {images.map(image => (
                                    <div key={image.index} className={`switcher-item ${isImageSelected(image.source) ? "selected" : ""}`}
                                        onClick={() => setSelectedImage(image)}>
                                        <span className="selection-indicator" />
                                        <img src={image.source} alt="" className="image" />
                                    </div>
                                ))}
                            </div>
                            <span className={`forward-arrow__wrapper ${forwardArrowDisabled ? "disabled" : ""}`}
                                onClick={scrollForward}>
                                <BsTriangleFill className="arrow" />
                            </span>
                        </div>
                        <div className="selected-image__wrapper">
                            <Magnifier src={selectedImage.source}
                                zoomFactor={1.1}
                                mgShape="circle"
                                mgTouchOffsetX={0}
                                mgMouseOffsetY={0} />
                        </div>
                    </>
                    :
                    <>
                        <span className={`back-arrow__wrapper ${backArrowDisabled ? "disabled" : ""}`}
                            onClick={setPrevImage}>
                            <BsTriangleFill className="arrow" />
                        </span>
                        <div className="selected-image__wrapper">
                            <Magnifier src={selectedImage.source}
                                zoomFactor={1.1}
                                mgShape="circle"
                                mgTouchOffsetX={0}
                                mgMouseOffsetY={0} />
                        </div>
                        <span className={`forward-arrow__wrapper ${forwardArrowDisabled ? "disabled" : ""}`}
                            onClick={setNextImage}>
                            <BsTriangleFill className="arrow" />
                        </span>
                    </>
            }
        </div>
    )
}

export default ImageViewer
