import React from "react";
import { Modal } from "react-bootstrap";

const Trailer = ({modalShow, setModalShow, trailer}) => {
    return (
        <Modal
            size="lg"
            show={modalShow}
            onHide={() => setModalShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
            </Modal.Header>
            <Modal.Body>
                <iframe width="100%" height="515" src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1`}
                    title="YouTube video player"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                />
            </Modal.Body>
        </Modal>
    )
}

export default Trailer;