import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Footer = () => {
    return (
      <Container fluid className="colour2 py-3">
        <Row>
        <Col md={6}>
            <h2 className="text-center py-5 linkw">GoGym</h2>
        </Col>
          <Col md={3}>
            <h5 className='linkw'>Socials</h5>
            <ul className="list-unstyled">
              <li><a className='linkw' href="#">Facebook</a></li>
              <li><a className='linkw' href="#">Instagram</a></li>
              <li><a className='linkw' href="#">Twitter</a></li>
              <li><a className='linkw' href="#">Reddit</a></li>
            </ul>
          </Col>
          <Col md={3}>
            <h5 className='linkw'>Resources</h5>
            <ul className="list-unstyled">
              <li><a className='linkw' href="#">Terms of Service</a></li>
              <li><a className='linkw' href="#">Privacy Policy</a></li>
              <li><a className='linkw' href="#">Contact</a></li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="text-center linkw">© 2023 My Company. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    )
}

export default Footer