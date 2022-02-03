import { useState } from "react"
import "bootstrap/dist/css/bootstrap.css"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import openDayData from "./data/OpenDay.json"
import Topics from "./components/Topics"

console.log(openDayData)

function App() {
  const [topics, updateTopics] = useState(openDayData.topics)
  const [searchQuery, updateSearchQuery] = useState("")
  const [learnMoreOpen, updateLearnMoreOpen] = useState(false)
  const [learnMoreTarget, updateLearnMoreTarget] = useState()

  const sortTopics = (e) => {
    const dropdownValue = e.target.value
    const copiedArray = [...topics]
    let sortedArray
    if (dropdownValue === "a-z") {
      sortedArray = copiedArray.sort((a, b) => a.name.localeCompare(b.name))
    } else if (dropdownValue === "z-a") {
      sortedArray = copiedArray.sort((a, b) => b.name.localeCompare(a.name))
    } else {
      sortedArray = openDayData.topics
    }

    updateTopics(sortedArray)
  }

  const learnMoreToggle = (id) => {
    updateLearnMoreOpen(!learnMoreOpen)
    updateLearnMoreTarget(
      topics.find((topic) => {
        return topic.id === id
      })
    )
  }

  return (
    <Container>
      <Row className="py-4">
        <Col className="text-center">
          <h1>{openDayData.description}</h1>
        </Col>
      </Row>
      {!learnMoreOpen && (
        <>
          <Row className="py-4">
            <div className="col">
              <Form.Control
                type="text"
                className="mb-2"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
              />
            </div>
            <div className="col col-md-auto">
              <Form.Control
                as="select"
                size="md"
                onChange={(e) => sortTopics(e)}
              >
                <option>Sort</option>
                <option value="a-z">A - Z</option>
                <option value="z-a">Z - A</option>
              </Form.Control>
            </div>
          </Row>
          <Row className="py-4">
            <Topics
              topics={topics}
              searchQuery={searchQuery}
              onClick={learnMoreToggle}
            />
          </Row>
        </>
      )}
      {learnMoreOpen && (
        <>
          <Button variant="secondary" onClick={learnMoreToggle}>
            Back
          </Button>
          <Row className="py-4">
            <h2>{learnMoreTarget.name}</h2>
            <p>{learnMoreTarget.description}</p>
            <h4>Programs</h4>
            {learnMoreTarget.programs.map((program) => (
              <Card key={program.id} className="my-2">
                <Card.Body>
                  <Card.Title>{program.title}</Card.Title>
                  <p>{program.description_short}</p>
                  <p>{program.start_time}</p>
                </Card.Body>
              </Card>
            ))}
          </Row>
        </>
      )}
    </Container>
  )
}

export default App
