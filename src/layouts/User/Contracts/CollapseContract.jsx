import React from "react";
import { Accordion, Card } from "react-bootstrap";

function CollapseContract(props) {
  function formatString(str) {
    if (str) return str.split("+")[0].split("T").join(" ").split(".")[0];
    else return "N/A";
  }
  const { type, contract, field } = props;
  return (
    <Accordion>
      <Card>
        <Accordion.Toggle
          as={Card.Header}
          eventKey="0"
          className={`${type} cursor booking-card`}
        >
          <div className=" d-flex justify-content-between align-items-center">
            <div>
              <div className="font-weight-bold h3 mb-0">{field[0].name}</div>
              <div className="small text-uppercase">{field[0].address}</div>
            </div>
            <div>
              <div className="text-uppercase small">Car number</div>
              <div className="font-weight-bold h3 mb-0">
                {contract.carNumber}
              </div>
            </div>
            {/* Show booking time */}
            {type === "booking" && (
              <>
                <div>
                  <div className="text-uppercase small">Book in time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeInBook)}
                  </div>
                </div>
                <div>
                  <div className="text-uppercase small">Book out time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeOutBook)}
                  </div>
                </div>
              </>
            )}
            {/* Show parking time */}
            {type === "parking" && (
              <>
                <div>
                  <div className="text-uppercase small">Car in time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeCarIn)}
                  </div>
                </div>
                <div>
                  <div className="text-uppercase small">Book out time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeOutBook)}
                  </div>
                </div>
              </>
            )}
            {/* Show leaved time */}
            {type === "leaved" && (
              <>
                <div>
                  <div className="text-uppercase small">Car in time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeCarIn)}
                  </div>
                </div>
                <div>
                  <div className="text-uppercase small">Car out time</div>
                  <div className="font-weight-bold h5 mb-0">
                    {formatString(contract.timeCarOut)}
                  </div>
                </div>
              </>
            )}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>Hello! I'm the body</Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default CollapseContract;
