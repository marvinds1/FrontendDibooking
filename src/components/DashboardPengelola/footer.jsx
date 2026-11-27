import { Container } from "react-bootstrap"

function Footer() {
    return (
        <div>
            <Container className="my-2">
                <div className="dibooking-footer-below">
                    <p>Copyright {new Date().getFullYear()} Seluruh Hak Cipta, Dibooking</p>
                </div>
            </Container>
        </div>
    )
}

export default Footer
