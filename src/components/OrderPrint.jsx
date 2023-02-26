import Item from "antd/es/list/Item";
import React from "react";
import "../css/orderPrint.css";

export const OrderPrint = ({ r, data }) => {
  return (
    <div className="print">
      <div ref={r}>
        <table
          border="0"
          cellpadding="0"
          cellspacing="0"
          id="sheet0"
          class="sheet0 gridlines">
          <col class="col0" />
          <col class="col1" />
          <col class="col2" />
          <col class="col3" />
          <col class="col4" />
          <col class="col5" />
          <col class="col6" />
          <col class="col7" />
          <col class="col8" />
          <col class="col9" />
          <col class="col10" />
          <tbody>
            <tr class="row0">
              <td class="column0 style1 s">[%template%]</td>
              <td class="column1 style141 s style143" colspan="7">
                Заказ-наряд: 465/1 от{" "}
                {new Date(Date.parse(data.date_created)).toLocaleDateString(
                  "ru-RU"
                )}{" "}
                (Акт выполненных работ)
              </td>
              <td class="column8 style162 s style164" colspan="3">
                Исполнитель
              </td>
            </tr>
            <tr class="row1">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style168 s style170" colspan="7">
                Заказчик:
              </td>
              <td class="column8 style144 s style152" colspan="3" rowspan="5">
                Индивидуальный предприниматель Одинцов Владислав Александрович,
                ИНН
                <br />
                290132866600
              </td>
            </tr>
            <tr class="row2">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style110 s style112" colspan="7">
                {data.client.name} ИНН {data.client.inn}, КПП {data.client.kpp}
              </td>
            </tr>
            <tr class="row3">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style113 s style115" colspan="7">
                {data.client.adress}
              </td>
            </tr>
            <tr class="row4">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style156 s style158" colspan="4">
                Автомобиль(марка, модель)
              </td>
              <td class="column5 style166 s style167" colspan="3">
                VIN номер
              </td>
            </tr>
            <tr class="row5">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style122 s style123" colspan="4">
                {data.transport.brand} {data.transport.model}{" "}
                {data.transport.modification}
              </td>
              <td class="column5 style133 s style123" colspan="3">
                {data.transport.vin}
              </td>
            </tr>
            <tr class="row6">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style165 s style140" colspan="4">
                Гос. Номер
              </td>
              <td class="column5 style139 s style140" colspan="3">
                Номер двигателя
              </td>
              <td class="column8 style116 s style121" colspan="3" rowspan="2">
                г.Архангельск, Юрасский промузел, строение 8
              </td>
            </tr>
            <tr class="row7">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style122 s style123" colspan="4">
                {data.transport.carNumber}
              </td>
              <td class="column5 style133 null style123" colspan="3">
                {data.transport.engineNumber}
              </td>
            </tr>
            <tr class="row8">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style159 s style161" colspan="4">
                Год выпуска
              </td>
              <td class="column5 style139 s style140" colspan="3">
                Телефон
              </td>
              <td class="column8 style136 s style138" colspan="3">
                ТЕЛЕФОН: 8(8182) 424-414
              </td>
            </tr>
            <tr class="row9">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style174 s style175" colspan="4">
                {data.transport.year}
              </td>
              <td class="column5 style134 s style135" colspan="3">
                89210745398
              </td>
              <td class="column8 style153 s style155" colspan="3">
                САЙТ: АВТОЭЛЕКТРИК29.РФ
              </td>
            </tr>
            <tr class="row10">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style10 null"></td>
              <td class="column2 style10 null"></td>
              <td class="column3 style10 null"></td>
              <td class="column4 style10 null"></td>
              <td class="column5 style10 null"></td>
              <td class="column6 style10 null"></td>
              <td class="column7 style10 null"></td>
              <td class="column8 style7 null"></td>
              <td class="column9 style7 null"></td>
              <td class="column10 style7 null"></td>
            </tr>
            <tr class="row11">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style67 s style75" colspan="4" rowspan="3">
                1. ВЫПОЛНЕННЫЕ РАБОТЫ И УСЛУГИ
              </td>
              <td class="column5 style10 null"></td>
              <td class="column6 style76 s style78" rowspan="3">
                Дата
              </td>
              <td class="column7 style61 s style62" colspan="2">
                оформления
              </td>
              <td class="column9 style53 null style54" colspan="2"></td>
            </tr>
            <tr class="row12">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5 style10 null"></td>
              <td class="column7 style63 s style64" colspan="2">
                исполнения
              </td>
              <td class="column9 style53 null style54" colspan="2"></td>
            </tr>
            <tr class="row13">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5 style10 null"></td>
              <td class="column7 style65 s style66" colspan="2">
                выдачи автомобиля
              </td>
              <td class="column9 style53 null style54" colspan="2"></td>
            </tr>
            <tr class="row14">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style11 null"></td>
              <td class="column2 style11 null"></td>
              <td class="column3 style11 null"></td>
              <td class="column4 style11 null"></td>
              <td class="column5 style11 null"></td>
              <td class="column6 style11 null"></td>
              <td class="column7 style11 null"></td>
              <td class="column8 style11 null"></td>
              <td class="column9 style11 null"></td>
              <td class="column10 style7 null"></td>
            </tr>
            <tr class="row15">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style58 s style60" colspan="4">
                Наименование работ, услуг
              </td>
              <td class="column5 style12 s">Кол-во</td>
              <td class="column6 style12 s">Цена</td>
              <td class="column7 style12 s">Сумма</td>
              <td class="column8 style55 s style57" colspan="3">
                Примечания\Пояснения
              </td>
            </tr>
            <tr class="row16">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style50 s style52" colspan="4">
                Компьютерная диагностика MAN TGS
              </td>
              <td class="column5 style36 n">1.0</td>
              <td class="column6 style14 n">2,000.00р.</td>
              <td class="column7 style14 f">2,000.00р.</td>
              <td class="column8 style47 null style49" colspan="3"></td>
            </tr>
            <tr class="row17">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style50 s style52" colspan="4">
                Диагностика топливной системы
              </td>
              <td class="column5 style36 n">1.0</td>
              <td class="column6 style14 n">5,000.00р.</td>
              <td class="column7 style14 f">5,000.00р.</td>
              <td class="column8 style47 null style49" colspan="3"></td>
            </tr>
            <tr class="row18">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style50 s style52" colspan="4">
                Ремонт автономного отопителя
              </td>
              <td class="column5 style36 n">1.0</td>
              <td class="column6 style14 n">4,000.00р.</td>
              <td class="column7 style14 f">4,000.00р.</td>
              <td class="column8 style32 null"></td>
              <td class="column9 style33 null"></td>
              <td class="column10 style34 null"></td>
            </tr>
            <tr class="row19">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style50 s style52" colspan="4">
                Демонтаж/монтаж автономного отопителя
              </td>
              <td class="column5 style36 n">1.0</td>
              <td class="column6 style14 n">4,000.00р.</td>
              <td class="column7 style14 f">4,000.00р.</td>
              <td class="column8 style32 null"></td>
              <td class="column9 style33 null"></td>
              <td class="column10 style34 null"></td>
            </tr>
            <tr class="row20">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style50 s style52" colspan="4">
                Ремонт освещения
              </td>
              <td class="column5 style36 n">3.0</td>
              <td class="column6 style14 n">2,150.00р.</td>
              <td class="column7 style14 f">6,450.00р.</td>
              <td class="column8 style32 null"></td>
              <td class="column9 style33 null"></td>
              <td class="column10 style34 null"></td>
            </tr>
            <tr class="row21">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style50 s style52" colspan="4">
                Диагностика/Замена карданного вала
              </td>
              <td class="column5 style36 n">1.0</td>
              <td class="column6 style14 n">8,000.00р.</td>
              <td class="column7 style14 f">8,000.00р.</td>
              <td class="column8 style32 null"></td>
              <td class="column9 style33 null"></td>
              <td class="column10 style34 null"></td>
            </tr>
            <tr class="row22">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5 style16 null"></td>
              <td class="column6 style17 s">Итого:</td>
              <td class="column7 style18 f">29,450.00р.</td>
              <td class="column8 style16 null"></td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row23">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row24">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style126 s style128" colspan="7">
                2. ЗАПАСНЫЕ ЧАСТИ И МАТЕРИАЛЫ, ОПЛАЧИВАЕМЫЕ ЗАКАЗЧИКОМ
              </td>
              <td class="column8 style11 null"></td>
              <td class="column9 style11 null"></td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row25">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row26">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style83 s style85" colspan="6">
                Материальные ценности
              </td>
              <td class="column7 style90 s style91" rowspan="2">
                Единица измерения
              </td>
              <td class="column8 style81 s style82" rowspan="2">
                Кол-во
              </td>
              <td class="column9 style81 s style82" rowspan="2">
                Цена
              </td>
              <td class="column10 style130 s style131" rowspan="2">
                Сумма
              </td>
            </tr>
            <tr class="row27">
              <td class="column0">&nbsp;</td>
              <td class="column1 style176 s style80" colspan="4">
                Наименование
              </td>
              <td class="column5 style79 s style80" colspan="2">
                Артикул
              </td>
            </tr>
            <tr class="row28">
              <td class="column0">&nbsp;</td>
              <td class="column1 style171 s style173" colspan="4">
                Нагнетатель для Эберспехер D4 24V - 4kW (маленькая крыльчатка)
              </td>
              <td class="column5 style178 s style179" colspan="2">
                252114992000
              </td>
              <td class="column7 style37 s">шт</td>
              <td class="column8 style38 n">1</td>
              <td class="column9 style39 n">&nbsp;&nbsp;5,500.00р.</td>
              <td class="column10 style40 f">&nbsp;&nbsp;5,500.00р.</td>
            </tr>
            <tr class="row29">
              <td class="column0">&nbsp;</td>
              <td class="column1 style171 s style173" colspan="4">
                Горелка отопителя Airtronic D4 D4S
              </td>
              <td class="column5 style178 s style179" colspan="2">
                25.2113.10.0100
              </td>
              <td class="column7 style37 s">шт</td>
              <td class="column8 style38 n">1</td>
              <td class="column9 style39 n">&nbsp;&nbsp;4,000.00р.</td>
              <td class="column10 style40 f">&nbsp;&nbsp;4,000.00р.</td>
            </tr>
            <tr class="row30">
              <td class="column0">&nbsp;</td>
              <td class="column1 style171 s style173" colspan="4">
                гофра разрезн. за 0,5м! для автономного отопителя d=90mm
                \EBERSPACHER
              </td>
              <td class="column5 style178 s style179" colspan="2">
                25.2123.16.0201
              </td>
              <td class="column7 style37 s">шт</td>
              <td class="column8 style38 n">1</td>
              <td class="column9 style41 n">1,600.00р.</td>
              <td class="column10 style40 f">&nbsp;&nbsp;1,600.00р.</td>
            </tr>
            <tr class="row31">
              <td class="column0">&nbsp;</td>
              <td class="column1 style42 null"></td>
              <td class="column2 style42 null"></td>
              <td class="column3 style42 null"></td>
              <td class="column4 style42 null"></td>
              <td class="column5 style42 null"></td>
              <td class="column6 style42 null"></td>
              <td class="column7 style43 null"></td>
              <td class="column8 style44 null"></td>
              <td class="column9 style43 s">Итого:</td>
              <td class="column10 style45 f">11,100.00р.</td>
            </tr>
            <tr class="row32">
              <td class="column0">&nbsp;</td>
              <td class="column1 style42 null"></td>
              <td class="column2 style42 null"></td>
              <td class="column3 style42 null"></td>
              <td class="column4 style42 null"></td>
              <td class="column5 style42 null"></td>
              <td class="column6 style42 null"></td>
              <td class="column7 style43 null"></td>
              <td class="column8 style44 null"></td>
              <td class="column9 style43 null"></td>
              <td class="column10 style46 null"></td>
            </tr>
            <tr class="row33">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style132 s style132" colspan="9">
                &nbsp;3. ОТМЕТКА О ПРИНЯТЫХ ОТ ЗАКАЗЧИКА ЗАПАСНЫХ ЧАСТЯХ И
                МАТЕРИАЛАХ
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row34">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row35">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style92 s style93" colspan="4">
                Наименование
              </td>
              <td class="column5 style12 s">Кол-во</td>
              <td class="column6 style98 s style99" colspan="2">
                Комментарий
              </td>
              <td class="column8 style94 s style95" colspan="3">
                Принял в производство
              </td>
            </tr>
            <tr class="row36">
              <td class="column0 style1 null"></td>
              <td class="column1 style104 null style106" colspan="4"></td>
              <td class="column5 style15 null"></td>
              <td class="column6 style86 null style87" colspan="2"></td>
              <td class="column8 style107 null style109" colspan="3"></td>
            </tr>
            <tr class="row37">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4 style17 s">Итого:</td>
              <td class="column5 style22 f">0.00</td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row38">
              <td class="column0">&nbsp;</td>
              <td class="column1 style23 null"></td>
              <td class="column2 style23 null"></td>
              <td class="column3 style23 null"></td>
              <td class="column4 style23 null"></td>
              <td class="column5 style23 null"></td>
              <td class="column6 style23 null"></td>
              <td class="column7 style23 null"></td>
              <td class="column8 style23 null"></td>
              <td class="column9 style23 null"></td>
              <td class="column10 style23 null"></td>
            </tr>
            <tr class="row39">
              <td class="column0">&nbsp;</td>
              <td class="column1 style100 s style100" colspan="5">
                С объемом работ и стоимостью заказа
              </td>
              <td class="column6 style101 f style102" colspan="2">
                40,550.00
              </td>
              <td class="column8 style24 s">руб.</td>
              <td class="column9 style27 null"></td>
              <td class="column10 style35 null"></td>
            </tr>
            <tr class="row40">
              <td class="column0">&nbsp;</td>
              <td class="column1 style103 s style103" colspan="7">
                согласен, с Правилами пользования услугами предприятия
                ознакомлен.
              </td>
              <td class="column8 style97 null style97" colspan="3"></td>
            </tr>
            <tr class="row41">
              <td class="column0">&nbsp;</td>
              <td class="column1 style23 null"></td>
              <td class="column2 style23 null"></td>
              <td class="column3 style23 null"></td>
              <td class="column4 style23 null"></td>
              <td class="column5 style23 null"></td>
              <td class="column6 style23 null"></td>
              <td class="column7 style23 null"></td>
              <td class="column8 style129 s style129" colspan="3">
                (подпись)
              </td>
            </tr>
            <tr class="row42">
              <td class="column0">&nbsp;</td>
              <td class="column1 style89 s style89" colspan="7">
                Гарантийные обязательства:
              </td>
              <td class="column8 style30 null"></td>
              <td class="column9 style30 null"></td>
              <td class="column10 style30 null"></td>
            </tr>
            <tr class="row43">
              <td class="column0">&nbsp;</td>
              <td class="column1 style31 s">1)</td>
              <td class="column2 style89 s style89" colspan="9">
                На сборочно-разборочные работы 2(две) недели или 500 км пробега
              </td>
            </tr>
            <tr class="row44">
              <td class="column0">&nbsp;</td>
              <td class="column1 style31 s">2)</td>
              <td class="column2 style89 s style89" colspan="9">
                На регулировочные и диагностические работы - 1 (одна) неделя или
                100 (сто) километров пробега
              </td>
            </tr>
            <tr class="row45">
              <td class="column0">&nbsp;</td>
              <td class="column1 style31 s">3)</td>
              <td class="column2 style89 s style89" colspan="9">
                На кузовные и окрасочные работы 6 (шесть) месяцев
              </td>
            </tr>
            <tr class="row46">
              <td class="column0">&nbsp;</td>
              <td class="column1 style31 s">4)</td>
              <td class="column2 style89 s style89" colspan="9">
                На запасные части, согласно гарантии завода изготовителя, при
                установке их в сертифицированном сервисе.
              </td>
            </tr>
            <tr class="row47">
              <td class="column0">&nbsp;</td>
              <td class="column1 style31 null"></td>
              <td class="column2 style31 null"></td>
              <td class="column3 style31 null"></td>
              <td class="column4 style31 null"></td>
              <td class="column5 style31 null"></td>
              <td class="column6 style31 null"></td>
              <td class="column7 style31 null"></td>
              <td class="column8 style31 null"></td>
              <td class="column9 style31 null"></td>
              <td class="column10 style31 null"></td>
            </tr>
            <tr class="row48">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style88 s style88" colspan="10" rowspan="3">
                Все претензии, касающиеся состояния, комплектности или подмены
                отдельных составных частей автомототранспортного средства,
                заказчик обязан предъявить исполнителю непосредственно при
                получении его из тех. обслуживания и ремонта. В противном случае
                он теряет право впоследствии ссылаться на эти недостатки.
                Заказчик обязан с участием Подрядчика осмотреть и принять
                транспортное средство после завершения работ. Претензии по
                внешнему виду и сохранности имущества принимаются только при
                совместном осмотре.
              </td>
            </tr>
            <tr class="row49">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row50">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row51">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style23 null"></td>
              <td class="column2 style23 null"></td>
              <td class="column3 style23 null"></td>
              <td class="column4 style23 null"></td>
              <td class="column5 style23 null"></td>
              <td class="column6 style23 null"></td>
              <td class="column7 style23 null"></td>
              <td class="column8 style23 null"></td>
              <td class="column9 style23 null"></td>
              <td class="column10 style23 null"></td>
            </tr>
            <tr class="row52">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style125 s style125" colspan="7">
                Рекомендации
              </td>
              <td class="column8 style26 null"></td>
              <td class="column9 style26 null"></td>
              <td class="column10 style26 null"></td>
            </tr>
            <tr class="row53">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style88 s style88" colspan="9">
                С рекомендациями по эксплуатации автомобиля после выполненных
                работ ознакомлен
              </td>
              <td class="column10 style28 null"></td>
            </tr>
            <tr class="row54">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style25 null"></td>
              <td class="column2 style25 null"></td>
              <td class="column3 style25 null"></td>
              <td class="column4 style25 null"></td>
              <td class="column5 style25 null"></td>
              <td class="column6 style25 null"></td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8 style25 null"></td>
              <td class="column9 style25 null"></td>
              <td class="column10 style25 null"></td>
            </tr>
            <tr class="row55">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style29 s">
                С объемом и стоимостью выполненных работ согласен, комплектность
                и внешний вид автомобиля проверил,
              </td>
              <td class="column2 style25 null"></td>
              <td class="column3 style25 null"></td>
              <td class="column4 style25 null"></td>
              <td class="column5 style25 null"></td>
              <td class="column6 style25 null"></td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8 style25 null"></td>
              <td class="column9 style25 null"></td>
              <td class="column10 style25 null"></td>
            </tr>
            <tr class="row56">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style29 s">
                автомобиль из ремонта получил. Претензий не имею.
              </td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row57">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style29 null"></td>
              <td class="column2" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column3" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column4" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column8" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column9" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
            <tr class="row58">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style96 null style97" colspan="4"></td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7 style96 null style97" colspan="4"></td>
            </tr>
            <tr class="row59">
              <td class="column0" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column1 style124 s style124" colspan="3">
                (подпись и печать исполнителя)
              </td>
              <td style={{ border: 0, background: "white" }}>&nbsp;</td>
              <td class="column5" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column6" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
              <td class="column7 style124 s style124" colspan="3">
                (подпись заказчика)
              </td>
              <td class="column10" style={{ border: 0, background: "white" }}>
                &nbsp;
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
