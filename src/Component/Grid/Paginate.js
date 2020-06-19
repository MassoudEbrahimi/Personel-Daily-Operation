import React, { Component } from 'react';

import GridContext from './GridContext';

class Paginate extends Component {
    static contextType = GridContext;


    changeSize = (e) => {
        const { changePageSize } = this.context;
        changePageSize(e.target.value)
    }

    render() {
        const { nextPage, prevPage, pageNumber, dataLength, pageSize, firstPage, lastPage } = this.context;

        return (

            <div className="table-footer card">
                <div className="dataTables_length" id="datatable_length">
                    <label>
                        <span>تعدا ردیف در هر صفحه:</span>
                        <select className="browser-default text-center" style={{width:"100px",textAlign:"center"}} defaultValue={pageSize} onChange={this.changeSize}>
                            {/* <title>۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹</title> */}
                            <option value="10">۱۰</option>
                            <option value="20">۲۰</option>
                            <option value="30">۳۰</option>
                            <option value="50">۵۰</option>
                            <option value="100">۱۰۰</option>
                            {/* <option value="500">500</option>
                            <option value="1500">1500</option> */}
                        </select>
                    </label>
                    <span >تعداد تمامی رکورد ها :<span style={{ fontSize: "16px", color: "black" }}>{dataLength}</span></span>
                </div>
                <div className="dataTables_info" id="datatable_info" role="status" aria-live="polite">{pageNumber} از {dataLength !== null ? Math.ceil(dataLength / Number(pageSize)) : ''}</div>
                <div className="dataTables_paginate paging_simple_numbers" id="datatable_paginate">
                    <ul className="material-pagination">
                        <li className="paginate_button next" id="datatable_next" onClick={lastPage}>
                            <i className="material-icons">
                                <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M5.59,7.41L7,6L13,12L7,18L5.59,16.59L10.17,12L5.59,7.41M11.59,7.41L13,6L19,12L13,18L11.59,16.59L16.17,12L11.59,7.41Z" />
                                </svg>
                            </i>
                        </li>
                        <li className="paginate_button next" id="datatable_next" onClick={nextPage}>
                            <i className="material-icons">
                                <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
                                </svg>
                            </i>
                        </li>
                        <li className="paginate_button previous disabled" id="datatable_previous" onClick={prevPage}>
                            <i className="material-icons">
                                <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
                                </svg>
                            </i>
                        </li>


                        <li className="paginate_button next" id="datatable_next" onClick={firstPage}>
                            <i className="material-icons">
                                <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M18.41,7.41L17,6L11,12L17,18L18.41,16.59L13.83,12L18.41,7.41M12.41,7.41L11,6L5,12L11,18L12.41,16.59L7.83,12L12.41,7.41Z" />
                                </svg>
                            </i>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default Paginate