// import node module libraries
import { Link } from "react-router-dom";
import { Col, Row, Card, Table, Image } from "react-bootstrap";

// import required data files
import { ActiveProjectsDataProps } from "types";

const FuncioalidadesActivas: ActiveProjectsDataProps[] = [
  {
    id: 1,
    projectName: "Generación de Muestras",
    priority: "Medium",
    priorityBadgeBg: "warning",
    hours: 34,
    progress: 15,
    brandLogo: "/images/cpm/logo-vector.png",
    brandLogoBg: "bg-white",
    members: [
      { image: "images/avatar/avatar-1.jpg" },
      { image: "images/avatar/avatar-2.jpg" },
      { image: "images/avatar/avatar-3.jpg" },
    ],
  }
]

const DashboardEDC = () => {
  return (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white py-4">
            <h4 className="mb-0">Bienvenido al sistema de Estados de Cuentas</h4>
          </Card.Header>
          <Table responsive className="text-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>funcionalidad</th>
              </tr>
            </thead>
            <tbody>
              {FuncioalidadesActivas.map((item: ActiveProjectsDataProps) => {
                return (
                  <tr key={item.id}>
                    <td className="align-middle">
                      <div className="d-flex align-items-center">
                        <div>
                          <div
                            className={`icon-shape icon-md border p-4 rounded-1 ${item.brandLogoBg}`}
                          >
                            <Image src={item.brandLogo} alt="" className="" height={'40px'}/>
                          </div>
                        </div>
                        <div className="ms-3 lh-1">
                          <h5 className=" mb-1">
                            <Link to="/gdm" className="text-inherit">
                              {item.projectName}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </td>
                    {/*
                    <td className="align-middle">{item.hours}</td>
                    <td className="align-middle">
                      <span className={`badge bg-${item.priorityBadgeBg}`}>
                        {item.priority}
                      </span>
                    </td>
                    <td className="align-middle">
                      <div className="avatar-group">
                        {item.members.map((avatar, avatarIndex) => {
                          return (
                            <span
                              className="avatar avatar-sm"
                              key={avatarIndex}
                            >
                              <Image
                                alt="avatar"
                                src={avatar.image}
                                className="rounded-circle"
                              />
                            </span>
                          );
                        })}
                        <span className="avatar avatar-sm avatar-primary">
                          <span className="avatar-initials rounded-circle fs-6">
                            +5
                          </span>
                        </span>
                      </div>
                    </td>
                    <td className="align-middle text-dark">
                      <div className="float-start me-3">{item.progress}%</div>
                      <div className="mt-2">
                        <ProgressBar
                          now={item.progress}
                          style={{ height: "5px" }}
                        />
                      </div>
                    </td>*/}
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Card.Footer className="bg-white text-center">
            {/*
            <Link to="#" className="link-primary">
              View All Projects
            </Link> 
            */}
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  );
};

export default DashboardEDC;
