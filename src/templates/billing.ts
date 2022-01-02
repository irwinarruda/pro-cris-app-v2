const getBillingTemplate = () => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;500;600;700&display=swap" rel="stylesheet">
            <title>Printer</title>
            <style>
                * {
                    box-sizing: border-box;
                }
                html, body, div, span, applet, object, iframe,
                h1, h2, h3, h4, h5, h6, p, blockquote, pre,
                aside, footer, header,
                menu, nav,section {
                    margin: 0;
                    padding: 0;
                    border: 0;
                    font-size: 100%;
                    font: inherit;
                    vertical-align: baseline;
                }
                figure, footer, header, section {
                    display: block;
                }
                body {
                    line-height: 1;
                }
                .card {
                    flex-direction: column;
                    display: flex;
                    max-width: 354px;
                    margin: 0px;
                    padding: 0px;
                    border: 2px solid #DBD28A;
                    border-radius: 5px;
                    font-family: 'Quicksand', sans-serif;
                    overflow: hidden;
                }
                header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    padding: 12px 24px;
                    background-color: #8C7ECF;
                }
                header img {
                    display: block;
                    width: 110px;
                }
                header div p {
                    font-size: 12px;
                    font-weight: 500;
                    color: #FBFAFF;
                }
                header div p + p {
                    margin-top: 2px;
                }
                section {
                    padding: 16px 24px;
                }
                .day-container {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    flex-wrap: wrap;
                    margin-top: -4px;
                    margin-bottom: -4px;
                    margin-left: -4px;
                    margin-right: -4px;
                }
                .day {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 54px;
                    height: 22px;
                    margin: 4px 4px;
                    color: #FBFAFF;
                    font-weight: 500;
                    font-size: 14px;
                    background-color: #8C7ECF;
                    border: 1px solid #DBD28A;
                    border-radius: 3px;
                }
                .legend-container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 15px;
                }
                .legend-item {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    font-size: 11px;
                    font-weight: 500;
                    color: #46454D;
                }
                .legend-item + .legend-item {
                    margin-top: 4px;
                }
                .legend-item-color {
                    width: 14px;
                    height: 14px;
                    margin-right: 4px;
                    background-color: #8C7ECF;
                    border: 1px solid #DBD28A;
                    border-radius: 10000px;
                }
                .legend-text {
                    font-weight: 600;
                    color: #46454D;
                }
                .legend-text p + p {
                    margin-top: 6px;
                }
                .legend-text span {
                    text-decoration: underline;
                }
                .gray {
                    background-color: #B4B4B8;
                }
                /*#B4B4B8*/
            </style>
        </head>
        <body>
            <div class="card">
                <header>
                    <img src="https://firebasestorage.googleapis.com/v0/b/pro-cris-app.appspot.com/o/pro-cris-logo.png?alt=media&token=c99a43bf-7814-480a-bbb7-8afef443cffd" />
                    <div>
                        <p>Aluno: Irwin Arruda</p>
                        <p>Obrigada pela confiança!</p>
                    </div>
                </header>
                <section>
                    <div class="day-container">
                        <div class="day">12/12</div>
                        <div class="day gray">12/12</div>
                        <div class="day">12/12</div>
                        <div class="day">12/12</div>
                        <div class="day">12/12</div>
                        <div class="day gray">12/12</div>
                        <div class="day">12/12</div>
                        <div class="day">44/44</div>
                        <div class="day gray">44/44</div>
                        <div class="day">44/44</div>
                        <div class="day">44/44</div>
                        <div class="day">44/44</div>
                        <div class="day">44/44</div>
                        <div class="day">44/44</div>
                    </div>
                    <div class="legend-container">
                        <div class="legend">
                            <div class="legend-item"><div class="legend-item-color"></div>Aulas Normais</div>
                            <div class="legend-item"><div class="legend-item-color gray"></div>Aulas Extras</div>
                        </div>
                        <div class="legend-text">
                            <p>Quantidade de Aulas: 10</p>
                            <p>Total a Pagar: R$ 230.00</p>
                        </div>
                    </div>
                </section>
            </div>
        </body>
        </html>
    `;
};

export { getBillingTemplate };
