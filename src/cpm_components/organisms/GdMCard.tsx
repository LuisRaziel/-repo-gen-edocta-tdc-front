import { Card, Row, Col } from "react-bootstrap";
import GdMForm from "cpm_components/molecules/GdMForm";
import React from "react";

interface LoginCardProps {
    
    tipo_edocta: string;
    error: string | null;
    loading: boolean;
    key: string;
    ultimoPeriodo: string;
    onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeSelect: (e: React.ChangeEvent<HTMLSelectElement>)=> void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode

}

const GdMCard = ({ ultimoPeriodo, onChangeFile, onChangeSelect, onSubmit, error, loading, tipo_edocta, key, children}: LoginCardProps) => (
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white py-4">
            <h4 className="mb-0">Generación de Muestras</h4>
          </Card.Header>
        <Card.Body>
            <GdMForm 
                error={error} 
                loading={loading}
                onChangeFile={onChangeFile}
                onChangeSelect={onChangeSelect}
                onSubmit={onSubmit}
                ultimoPeriodo={ultimoPeriodo}
                key={key}
                tipo_edocta={tipo_edocta}
                >

            </GdMForm>
           {children}
        </Card.Body>
    </Card>
    </Col>
    </Row>
);

export default GdMCard;
