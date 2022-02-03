import { Card, Button } from "react-bootstrap"

const Topics = ({ topics, searchQuery, onClick }) => {
  return (
    <>
      {topics
        .filter((topic) =>
          topic.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .map((topic) => (
          <div className="col col-sm-6 col-md-4 my-2" key={topic.id}>
            <Card>
              <Card.Img
                variant="top"
                src={topic.cover_image}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100px",
                }}
              />
              <Card.Body>
                <Card.Title>{topic.name}</Card.Title>
                <Button variant="secondary" onClick={() => onClick(topic.id)}>
                  Learn more
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
    </>
  )
}

export default Topics
