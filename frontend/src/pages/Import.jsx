import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { Button, Form } from "react-bootstrap";
import axios from "axios";

let base_url_e = 'http://localhost:5000/api/Database/export'
let base_url_i = 'http://localhost:5000/api/Database/import'

const Import = () => {
    const [state, setState] = useState();
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const sellectFile = event.target.files ? event.target.files[0] : null;
        if (sellectFile) {
            setFile(sellectFile || null);
        }
    };

    function handleImport(e) {
        e.preventDefault();
        if (!file) return;
        const reader = new FileReader();
        reader.onload = async (e) => {
            const jsonContent = e.target?.result;

            console.log("jsonContent", jsonContent);
            axios
                .post('http://localhost:5000/api/Database/import', jsonContent, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(() => {
                    alert("Данные загружены");
                })
                .catch((error) => {
                    alert("Ошибка");
                    console.error("Ошибка при импорте", error);
                });
        };
        reader.readAsText(file);
    }

    function handleExport() {
        axios
            .get('http://localhost:5000/api/Database/export')
            .then((response) => {
                console.log("response", response);
                const blob = new Blob([JSON.stringify(response.data)], {
                    type: "application/json",
                });
                const link = document.createElement("a");
                link.href = URL.createObjectURL(blob);
                link.download = `data.json`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch((error) => {
                alert("Ошибка");
                console.error("Ошибка при экспорте", error);
            });

    }

    return (
        <div>
        
        <Form onSubmit={handleImport}>
                                    <Form.Label>
                                        Выберите файл
                                    </Form.Label>
                                    <Form.Control accept=".json" name="file" type="file" onChange={(e)=> handleFileChange(e)} />
                                <Button type="submit">Импортировать</Button>
                                </Form>
                                <div>
                                <Button onClick={handleExport}>Скачать</Button>
                                </div>

                                </div>
    );
};

export default Import;
