import React, { Component, createRef } from 'react';
import './Grid.css';
import Loading from '../loading/loading'
import Paginate from './Paginate';
import GridContext from './GridContext';
import $ from 'jquery';

import { mapStore } from '../../Store/Store'


class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: null,
            pageSize: this.props.pageSize || 10,
            pageNumber: this.props.pageNumber || 1,
            dataLength: null,
            columns: this.createColumns()
        }

        this.dom = createRef();
    }

    async componentDidMount() {
        await this.loadByQuery(() => {
            setTimeout(() => {
                $(this.dom.current).width($(window).width() - 350)
                $(this.dom.current).height($(window).height() - 190)
            }, 100)

        });
        window.onload = function () {
            var tableCont = document.querySelector('#table-cont')
            /**
             * scroll handle
             * @param {event} e -- scroll event
             */
            function scrollHandle(e) {
                var scrollTop = this.scrollTop;
                this.querySelector('thead').style.transform = 'translateY(' + scrollTop + 'px)';
            }

            tableCont.addEventListener('scroll', scrollHandle)
        }
    }



    createColumns = () => {
        const { columns } = this.props;
        return columns.map((o, i) => {
            return {
                showTitle: o.showTitle,
                title: o.title,
                filterType: 3,
                filterText: '',
                sort: { show: false, desc: false },
            }
        });

    }


    loadByQuery = async (cb) => {
        // const {actions} = this.context;

        const { api, cahnge, id } = this.props;
        const { pageSize, pageNumber, columns } = this.state;

        const res = await api({ pageSize, pageNumber, columns });
        // actions.loadGrid(id,  {...this.props, items : res.Items})
        // await cb && cb()
        this.setState({
            data: res.Items,
            dataLength: res.pageCount
        })
    }

    renderRow = (row, index) => {
        const { columns } = this.props;

        const rows = columns.map((o, i) => {
            return (<td className="p-2" data-toggle="tooltip" data-placement="bottom" title={row[o.title]}>{row[o.title]}</td>)
        });

        return (<tr key={index} >
            {this.createActions(row, index)}
            <th className="thin-row text-center p-2">{index + 1}</th>
            {rows}
        </tr>)
    }


    createActions = (row, index) => {
        const { edit } = this.props;

        return (
            <td className="grid-actions p-2 ">
                <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" onClick={() => { edit(row) }}>
                    <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                </svg>&nbsp;&nbsp;&nbsp;
                <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24" onClick={this.removeRow.bind(this, row, index)}>
                    <path fill="currentColor" d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                </svg>
            </td>
        )
    }


    renderRows = () => {
        const { data } = this.state;
        return data.map((o, i) => {
            return this.renderRow(o, i)
        })
    }

    handleSort = (i) => {
        const columns = Array.from(this.state.columns);


        if (columns[i].sort.show === false) {
            columns.forEach(o => {
                o.sort.show = false;
                o.sort.desc = false;
            });
            columns[i].sort.show = true;
        }
        else if (columns[i].sort.show === true && columns[i].sort.desc === true) {
            columns.forEach(o => {
                o.sort.show = false;
                o.sort.desc = false;
            });

        }
        else if (columns[i].sort.show === true) {
            columns[i].sort.desc = true

        }

        this.setState(prevState => {
            return {
                columns
            }
        }, () => {
            this.loadByQuery()
        });

    }
    removeRow = async (row, index) => {
        const { remove } = this.props;
        const res = await remove(row, index + 1);
        debugger
        if (res) {
            let rows = Array.from(this.state.data);

            rows.splice(index, 1);

            this.setState({
                data: rows
            })
        }

    }
    renderColumns = () => {
        const { columns } = this.state;
        const cols = columns.map((o, i) => {
            return (
                <th className="" onClick={this.handleSort.bind(this, i)}>
                    {o.showTitle}
                    {o.sort.show && !o.sort.desc && <span style={{ fontSize: 20 }}>&uarr;</span>}
                    {o.sort.show && o.sort.desc && <span style={{ fontSize: 20 }}>&darr;</span>}
                </th>
            )
        })

        return <tr className="text-center "><th style={{ width: "80px" }}>عملیات</th><th style={{ width: "10px" }}>ردیف</th>{cols}</tr>
    }
    // changeFilterType(i, e) {
    //     const columns = Array.from(this.state.columns);

    //     columns[i].filterType = Number(e.target.value);
    //     this.setState({ columns })
    // }
    // changeFilterText(i, e) {
    //     const columns = Array.from(this.state.columns);

    //     columns[i].filterText = e.target.value;
    //     this.setState({ columns })
    // }
    // sendFilter = () => {
    //     this.setState(prevState => {
    //         return {
    //             pageNumber: 1
    //         }
    //     }, () => {
    //         this.loadByQuery()
    //     });
    // }
    // clearFilter(i, e) {
    //     const columns = Array.from(this.state.columns);
    //     //columns[i].filterType =1;
    //     columns[i].filterText = '';

    //     this.setState(prevState => {
    //         return {
    //             columns
    //         }
    //     }, () => {
    //         this.loadByQuery()
    //     });


    // }
    // renderFilters = () => {
    //     const { columns } = this.state;
    //     const cols = columns.map((o, i) => {
    //         return (
    //             <th className="filter-area">
    //                 <input placeholder="جستجو ..." value={o.filterText} onChange={this.changeFilterText.bind(this, i)} />
    //                 <div style={{ display: 'flex' }}>

    //                     <button type="button" onClick={this.sendFilter}>
    //                         <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24">
    //                             <path fill="#686868" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
    //                         </svg>
    //                     </button>
    //                     <button type="button" onClick={this.clearFilter.bind(this, i)}>
    //                         <svg style={{ width: 18, height: 18 }} viewBox="0 0 24 24">
    //                             <path fill="#686868" d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
    //                         </svg>
    //                     </button>
    //                     <select defaultValue={o.filterType} className="browser-default" onChange={this.changeFilterType.bind(this, i)}>
    //                         <option value="1">برابر است با</option>
    //                         <option value="2">برابر نیست با</option>
    //                         <option value="3">شامل</option>
    //                         <option value="4">شامل نمیشود</option>
    //                     </select>
    //                 </div>
    //             </th>
    //         )
    //     })


    //     return <tr><th className="filter-area"></th> <th className="grid-cell thin" ></th>{cols}</tr>
    // }
    nextPage = () => {
        const { pageNumber, dataLength, pageSize } = this.state;
        if (pageNumber >= Math.ceil(dataLength / Number(pageSize))) return;

        this.setState(prevState => {
            return {
                pageNumber: prevState.pageNumber + 1
            }
        }, () => {
            this.loadByQuery()
        });
    }
    prevPage = () => {
        const { pageNumber } = this.state;
        if (pageNumber <= 1) return;

        this.setState(prevState => {
            return {
                pageNumber: prevState.pageNumber - 1
            }
        }, () => {
            this.loadByQuery()
        });

    }
    changePageSize = (size) => {
        this.setState(prevState => {
            return {
                pageSize: Number(size),
                pageNumber: 1
            }
        }, () => {
            this.loadByQuery()
        });
    }
    // renderColWidths = () => {
    //     const { columns } = this.state;
    //     const cols = columns.map((o, i) => {
    //         return (
    //             <col style={{ width: '75px' }} />
    //         )
    //     })


    //     return <colgroup>{cols}</colgroup>

    // }
    render() {
        const { data } = this.state;


        if (data === null) return (<Loading />);

        const contextValue = {
            ...this.props,
            ...this.state,
            loadByQuery: this.loadByQuery,
            changeStore: this.changeStore,
            prevPage: this.prevPage,
            nextPage: this.nextPage,
            changePageSize: this.changePageSize,
        }


        return (
            <GridContext.Provider value={contextValue}>
                <div className="col-12 mx-auto text-right" style={{ direction: "rtl" }} dir='rtl' >
                    <div className="card" style={{ height: "500px", overflowY: "scroll" }} id="table-cont">
                        <table className="table bg-light table-striped table-bordered overflow-scroll" >
                            <thead className="col-12 " style={{ backgroundColor: "#0DB8DE" }}>
                                {/* {this.renderColWidths()} */}
                                {/* {this.renderFilters()} */}
                                {this.renderColumns()}
                            </thead>
                            <tbody >
                                {this.renderRows()}
                            </tbody>
                        </table>

                    </div>
                    <div className="a-grid">
                        <Paginate />
                    </div>
                </div>
            </GridContext.Provider>
        );
    }
}

Grid.defaultProps = {
    change: (val) => { }
}
mapStore(Grid)
export default Grid;