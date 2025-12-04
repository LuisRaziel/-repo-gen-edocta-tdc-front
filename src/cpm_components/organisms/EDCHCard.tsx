import { Card, Row, Col } from "react-bootstrap";
import React from "react";
import EDCHForm from "cpm_components/molecules/EDCHForm";

interface EDCHCardProps {
    cif: string,
    onChangeCif: (e: React.ChangeEvent<HTMLInputElement>) => void,
    children: React.ReactNode,
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
    loading: boolean;
    key: string;

}

const EDCHCard = ({ onSubmit, loading, key, children, onChangeCif, cif}: EDCHCardProps) => (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white py-4">
            <h4 className="mb-0">Consulta de Historico de Estados de Cuenta</h4>
          </Card.Header>
        <Card.Body>
            <EDCHForm 
                loading={loading}
                onChangeCif={onChangeCif}
                onSubmit={onSubmit}
                key={key}
                cif={cif}
                >

            </EDCHForm>
            <br></br>
            <br></br>
           {children}
        </Card.Body>
    </Card>
    </Col>
    </Row>
);

export default EDCHCard;
