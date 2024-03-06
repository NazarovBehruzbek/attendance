import React, {useEffect, useState} from "react";
import {Button, Col, DatePicker, Row} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import {getToken} from "../../utilits";
import {tokenKey} from "../../constants/Constants";
import axios from "axios";
function Tabel() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [userTable, setuserTable] = useState([]);
    const authToken = getToken(tokenKey);
    const getTable = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken} `
            }
        }
        axios.get(`/api/table/getUserTable?pageNumber=0&pageSize=20`, config)
            .then((response) => {
                setuserTable(response.data.object);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    useEffect(() => {
        getTable();
    }, []);
    const getTableExcel = () => {
        const config = {
            headers: {
                'Authorization': `Bearer ${authToken}`
            },
            responseType: 'blob'
        };

        axios.get('/api/table/getUserTableExcel', config)
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `getTableExcel.xlsx`);
                document.body.appendChild(link);
                link.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Yuklashda xatolik:', error);
            });
    };
    const daysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month + 1, 0).getDate();
    };

    const getMonthDaysArray = (date) => {
        const totalDays = daysInMonth(date);
        const daysArray = [];

        for (let i = 1; i <= totalDays; i++) {
            daysArray.push(i);
        }

        return daysArray;
    };

    const daysArray = getMonthDaysArray(currentDate);

    const getStartingDayOfMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        return new Date(year, month, 1).getDay();
    };

    const startingDayOfMonth = getStartingDayOfMonth(currentDate);

    const onChange = (date, dateString) => {
        if (date) {
            const [year, month] = dateString.split("-").map(Number);
            setCurrentDate(new Date(year, month - 1));

        } else {
            setCurrentDate(new Date());
        }
    };

    return (
        <section>
            <Row>
                <Col md={19}></Col>
                <Col md={5}>
                    <DatePicker
                        onChange={onChange}
                        picker="month"
                    />
                    <Button
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            marginLeft: "10px",
                        }}
                        icon={<DownloadOutlined/>}
                        onClick={getTableExcel}
                    >
                        Excel
                    </Button>
                </Col>
            </Row>
            <div className="table-page">
                <table
                    style={{
                        width: "100%",
                        border: "1px solid black",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                        borderBottom: "0",
                    }}
                >
                    <tbody>
                    <tr>
                        <td
                            style={{
                                width: "75%",
                                border: "1px solid black",
                                textAlign: "center",
                            }}
                        >
                            <p>
                                <strong>NEFTGAZ</strong>
                            </p>
                            <hr style={{width: "98%", marginTop: "-5px"}}/>
                            tashkilotning nomi
                        </td>
                        <td style={{width: "3%", border: "1px solid black"}}></td>
                        <td
                            style={{
                                border: "1px solid black",
                                textAlign: "center",
                            }}
                            colSpan={3}
                        >
                            <strong>Hisobot davri</strong>
                        </td>
                    </tr>
                    <tr>
                        <td
                            style={{
                                width: "75%",
                                border: "1px solid black",
                                textAlign: "center",
                            }}
                        >
                            <p>
                                <strong>GEO2 IUT GLOBAL</strong>
                            </p>
                            <hr style={{width: "98%", marginTop: "-5px"}}/>
                            tarkibiy bo'linma nomi
                        </td>
                        <td style={{width: "3%", border: "1px solid black"}}></td>
                        <td
                            style={{
                                width: "7%",
                                border: "1px solid black",
                                textAlign: "center",
                            }}
                        >
                            <p>
                                <strong>dan</strong>
                            </p>
                            <hr style={{width: "95%", marginTop: "-5px"}}/>
                            01/02/2024
                        </td>
                        <td style={{width: "3%", border: "1px solid black"}}></td>
                        <td
                            style={{
                                width: "7%",
                                border: "1px solid black",
                                textAlign: "center",
                            }}
                        >
                            <p>
                                <strong>gacha</strong>
                            </p>
                            <hr style={{width: "95%", marginTop: "-5px"}}/>
                            29/02/2024
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={5} style={{textAlign: "center"}}>
                            <p>
                                <strong>
                                    Foydalanilgan ish vaqti hisobini yuritish <br/> TABELI
                                </strong>
                            </p>
                        </td>
                    </tr>
                    </tbody>
                </table>

                <table
                    style={{
                        width: "100%",
                        border: "1px solid black",
                        borderCollapse: "collapse",
                    }}
                >
                    <tbody>
                    <tr>
                        <td
                            rowSpan={2}
                            style={{
                                textAlign: "center",
                                width: "3%",
                                border: "1px solid black",
                            }}
                        >
                            <p>
                                <strong>T/R</strong>
                            </p>
                        </td>
                        <td
                            rowSpan={2}
                            style={{
                                textAlign: "center",
                                width: "5%",
                                border: "1px solid black",
                            }}
                        >
                            <p>
                                <strong>Tabel raqami</strong>
                            </p>
                        </td>
                        <td
                            rowSpan={2}
                            style={{
                                textAlign: "center",
                                width: "7%",
                                border: "1px solid black",
                            }}
                        >
                            <p>
                                <strong>F.I.SH</strong>
                            </p>
                        </td>
                        <td
                            rowSpan={2}
                            style={{
                                textAlign: "center",
                                width: "6%",
                                border: "1px solid black",
                            }}
                        >
                            <p>
                                <strong>Lavozimi</strong>
                            </p>
                        </td>
                        <td
                            colSpan={daysArray.length}
                            style={{textAlign: "center", border: "1px solid black", height: '60px'}}
                        >
                            <p>
                                <strong>Oy kunlari va belgilar</strong>
                            </p>
                        </td>
                        <td
                            rowSpan={2}
                            style={{
                                textAlign: "center",
                                width: "3%",
                                writingMode: "vertical-rl",
                                border: "1px solid black",
                            }}
                        >
                <span>
                  <strong>Ishga <br/> qatnashgan <br/> kunlar</strong>
                </span>
                        </td>
                        <td
                            rowSpan={2}
                            style={{
                                textAlign: "center",
                                width: "3%",
                                writingMode: "vertical-rl",
                                border: "1px solid black",
                            }}
                        >
                <span>
                  <strong>Ishga <br/> qatnashmagan <br/> kunlar</strong>
                </span>
                        </td>
                    </tr>
                    <tr style={{height: "50px"}}>
                        {daysArray.map((day, index) => (
                            (index + startingDayOfMonth) % 7 === 6 ||
                            (index + startingDayOfMonth) % 7 === 0
                                ? <td
                                    key={index}
                                    style={{
                                        textAlign: "center",
                                        border: "1px solid black",
                                        color: 'white',
                                        backgroundColor: '#FFC107',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {day}
                                </td> : <td
                                    key={index}
                                    style={{
                                        textAlign: "center",
                                        border: "1px solid black",
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {day}
                                </td>
                        ))}
                    </tr>
                    {userTable.map((item, index) => (
                        <tr style={{height: '50px'}} key={index}>
                            <td style={{textAlign: "center", border: "1px solid black"}}>
                                {index + 1}
                            </td>
                            <td style={{textAlign: "center", border: "1px solid black"}}>

                            </td>
                            <td style={{textAlign: "center", border: "1px solid black"}}>
                                {item.userName}
                            </td>
                            <td style={{textAlign: "center", border: "1px solid black"}}>
                                Dasturchi
                            </td>
                            {daysArray.map((hour, i) => {
                                const currentIndex = i + startingDayOfMonth;
                            return (
                                    <td
                                        key={i}
                                        style={{
                                            textAlign: "center",
                                            border: "1px solid black",
                                            color: (currentIndex % 7 === 6 || currentIndex % 7 === 0) ? 'white' : 'black',
                                            backgroundColor: (currentIndex % 7 === 6 || currentIndex % 7 === 0) ? '#FFC107' : 'white',
                                        }}
                                    >
                                        {(currentIndex % 7 === 6 || currentIndex % 7 === 0) ? 'V' : 0}
                                    </td>
                                );
                            })}

                            <td style={{textAlign: "center", border: "1px solid black"}}>{item.workingHours}</td>
                            <td  style={{textAlign: "center", border: "1px solid black"}}>2</td>
                        </tr>
                    ))}

                    </tbody>
                </table>
                <div style={{height:'80px'}}></div>
            </div>
        </section>
    );
}

export default Tabel;
