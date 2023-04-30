import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { VACANCY_ROUTE } from "../utils/consts";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Card className="text-center">
      <Card.Body>
        <Card.Title>Jobson is convenient in everything.</Card.Title>
        <Card.Text>
          This application is designed to find a job in the IT field. Easy to
          use and user-friendly design makes it understandable for users of any
          category.
        </Card.Text>
        <Link id="btn" to={VACANCY_ROUTE}>
          <Button variant="primary">Go to job search</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default Home;
