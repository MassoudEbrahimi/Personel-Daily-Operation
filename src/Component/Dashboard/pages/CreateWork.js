import React, { Component } from 'react';
import Grid from '../../Grid/Grid'
import "./CreateWork.css"
import data from '../../../FakeData/GridData'
import { mapStore } from '../../../Store/Store'
import { deleteNewJob, UpdateNewJob, CreateNewJob, CreateForm } from '../../../utils/axiosMethod'
import { Notification } from '../../../utils/swal'
import Swal from 'sweetalert2'

async function loadGird({ columns, pageSize, pageNumber }) {

    const requestFilters = columns.filter(o => o.filterText.trim() !== '').map((o, i) => {
        return {
            field: o.title,
            type: o.filterType,
            fieldValue: o.filterText,
            dataType: o.dataType, //int string
            tableName: o.tableName,
            fieldName: o.fieldName
        }
    })
    const requestSort = columns.filter(o => o.sort.show).map((o, i) => {
        if (o.sort.show) {
            return {
                field: o.title,
                type: o.sort.desc ? 'desc' : 'asc'
            }
        }
    })
    // const request = {
    //     pageSize,
    //     pageNumber,
    //     filters: requestFilters,
    //     sort: requestSort
    // }
    // const res = await GetPit(request)
    // return {
    //   Items: res.data.items,
    //   pageCount: res.data.pageCount
    // }
    /*************************************************************************** */
    /*************************************************************************** */
    /*************************************************************************** */
    var d = new Promise(resolve => {
        let serverData = data;
        setTimeout(() => {
            var filterCount = columns.filter(o => o.filterText.trim() != '');
            if (columns.length !== 0 && filterCount.length !== 0) {
                let temp = [];
                columns.forEach((o, i) => {
                    serverData.forEach((x, i) => {
                        if (String(x[o.title]).toLocaleLowerCase().trim() === String(o.filterText).toLocaleLowerCase().trim()) {
                            temp.push(x)
                        }
                    })
                });
                serverData = temp

            }

            let pagedData = serverData.filter((o, i) => {
                if (i >= (0 + (pageSize * (pageNumber - 1))) && i < (pageSize * pageNumber)) {
                    return o
                }
            })
            resolve({
                Items: pagedData,
                pageCount: serverData.length
            })
        }, 1750)
    });
    return d;
    /*************************************************************************** */
    /*************************************************************************** */
    /*************************************************************************** */


}
async function loadForm(row) {
    const request = {
        "id": 35, "actionType": 1
    }
    const result = await CreateForm(request);
    let modalData = result.data;

    if (row) {

        modalData.items.forEach(o => {
            if (o.type === "checkbox") {
                o.value = row[o.field] === "فعال" ? true : false
            }
            else
                o.value = row[o.field]
            // o.required = true;
        })
        return modalData
    }
    else {

        //در خواست افزودن
        return modalData
    }
    // { field: null, type: 'input', label: 'کد', value: id ? '521' : "" },
    //     { field: 'code', type: 'input', label: 'کد', value: id ? '521' : "" },
    // { field: 'name', type: 'input-group', label: 'نام', value: id ? '1000' : "" },
    // {
    //   field: 'mineRef',
    //     type: 'select',
    //       label: 'معدن',
    //         value: id ? 1 : null,
    //           items: [
    //             { id: 1, name: 'معدن - 1' },
    //             { id: 2, name: 'معدن - 2' },
    //             { id: 3, name: 'معدن - 3' },
    //           ],
    //             mapping: { text: 'name', value: 'id' }
    // },
    //   ]
    // const items = res.data.map(data => { return { id: data.code, name: data.name } })
    //دیتای فیک که بعدا حذف شود
    // var d = new Promise(resolve => {
    //   setTimeout(() => {
    //     resolve({
    //       id,
    //       title: 'پیت',
    //       items: [
    //         // { field: null, type: 'input', label: 'کد', value: id ? '521' : "" },
    //         { field: 'code', type: 'input', label: 'کد', value: id ? '521' : "" },
    //         { field: 'name', type: 'input', label: 'نام', value: id ? '1000' : "" },
    //         {
    //           field: 'mineRef',
    //           type: 'select',
    //           label: 'معدن',
    //           value: id ? 1 : null,
    //           items: res.data.map(data => { return { id: data.id, name: data.name } }),
    //           // { id: 1, name: 'معدن - 1' },
    //           // { id: 2, name: 'معدن - 2' },
    //           // { id: 3, name: 'معدن - 3' },
    //           mapping: { text: 'name', value: 'id' }
    //         },
    //       ]
    //     })
    //   }, 1000)
    // });
    // return d;
}
const namespace = {
    grid: 'CreateWorkList',
    modal: 'CreateWorkModal'
}
class CreateDaily extends Component {
    constructor(props) {
        super(props)
        this.state = {
            reloadGrid: false,
            isDelete: false
        }
    }
    reloaded = () => {
        this.setState({
            reloadGrid: false
        })
    }
    createForm = () => {
        return (
            <div class="col-lg-12 login-form">
                <form>
                    <div className="row d-flex col-12">
                        <div class="form-group d-flex  col-4">
                            <label class="form-control-label  col-3">تاریخ</label>
                            <input type="text" class="form-control-sm   no-outline col-9" />
                        </div>
                        <div class="form-group d-flex  col-4">
                            <label class="form-control-label  col-3">از ساعت</label><br />
                            <input type="time" class=" form-control-sm no-outline col-9" />
                        </div>
                        <div class="form-group d-flex  col-4">
                            <label class="form-control-label  col-3">تا ساعت</label><br />
                            <input type="time" class=" form-control-sm no-outline col-9" />
                        </div>
                        <div className="form-group d-flex col-4">
                            <label className="form-control-label  col-3">پروژه</label>
                            <select className="form-control-sm col-9">
                                <option>1</option>
                                <option>1</option>
                                <option>1</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div className="form-group d-flex col-4">
                            <label className="form-control-label  col-3 ">WBS</label>
                            <select className="form-control-sm col-9">
                                <option>1</option>
                                <option>1</option>
                                <option>1</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div className="form-group d-flex col-4">
                            <label className="form-control-label  col-3">نوع فعالیت</label>
                            <select className="form-control-sm col-9">
                                <option>1</option>
                                <option>1</option>
                                <option>1</option>
                                <option>1</option>
                            </select>
                        </div>
                        <div className="form-group d-flex col-12 ">
                            <label className="form-control-label col-1">تو ضیحات</label>
                            <textarea className="col-10" rows="1" cols="500" style={{ resize: "none" }} >
                            </textarea>
                            <div className="col-1">
                                <button type="submit" className="btn btn-outline-primary mx-auto col-7 mt-2" style={{ width: "200px", height: "40px" }}>ذخیره</button><br />
                                <button type="reset" className="btn btn-outline-primary mx-auto col-7 mt-2" style={{ width: "200px", height: "40px" }}>انصراف</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
    saveModal = async (data) => {


        for (var i = 0; i < data.items.length; i++) {
            if (data.items[i].required === "true")
                if (data.items[i].value === null || data.items[i].value === '' & data.items[i].type !== "checkbox") {
                    // toast.warning('لطفا فیلد های ضروری را وارد کنید')
                    return
                }
        }
        const { setStore, getStore } = this.context;
        let store = getStore();
        let obj = {}

        data.items.forEach((n, i) => {
            if (n.type === 'select') {
                obj[n.field] = n.value ? (n.value.id ? n.value.id : n.value) : null
            }
            else if (n.type === 'datepicker') {
                obj[n.field] = n.value ? (n.value.dateStr === null ? "" : n.value.dateStr) : ""
            }
            else if (n.type === 'checkbox') {
                obj[n.field] = n.value !== "" ? n.value : false
            }
            else if (n.type === "number") {
                obj[n.field] = n.value !== "" ? n.value : 0
            }
            else {
                obj[n.field] = n.value
            }
        })
        if (data.id)
            obj["id"] = data.id.id
        //edit
        if (data.id) {
            try {
                const res = await UpdateNewJob(JSON.parse(JSON.stringify([obj])))
                if (res.status === 200) {
                    this.closeModal()
                    this.setState({ reloadGrid: true });
                    // let rows = store.grid[namespace.grid].items;
                    // store.grid[namespace.grid].items[this.getIndex(rows, data.id)] = res
                    // store.grid[namespace.grid].items.push(res)
                    // setStore('grid', store.grid);
                    // toast.success('با موفیقت انجام شد')
                    this.setState({
                        modal: false,
                    })
                }
            }
            catch (ex) {
                if (ex.response && ex.response.status === 400)
                    Swal.fire()
            }
        }
        //add
        else {
            // setStore('grid', store.grid)
            try {
                const res = await CreateNewJob(JSON.parse(JSON.stringify([obj])));


                if (res.status === 200) {
                    this.setState({ reloadGrid: true });
                    this.closeModal()
                    // const { setStore, getStore } = this.context;
                    // let store = getStore();
                    // store.grid[namespace.grid].items.push(res.data)
                    // setStore('grid', store.grid)
                    // toast.success('با موفیقت انجام شد')
                    this.setState({
                        modal: false,
                    })
                }
            } catch (ex) {
                if (ex.response && ex.response.status === 400)
                    Swal.fire()
            }
        }
    }
    removeGridRow = async (row, index) => {
        await Swal.fire({
            title: `<span>ایا از حذف رکورد <strong>${index}<strong> مطمئن هستید ؟ </span>`,
            // text: "You won't be able to revert this!",
            icon: 'error',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'بله',
            cancelButtonText: 'خیر',
            width: "auto",
            allowOutsideClick: false,
            allowEscapeKey: false
        }).then((result) => {
            if (result.value)
                this.setState({ isDelete: true })
            else
                this.setState({ isDelete: false })
        })
        if (this.state.isDelete) {
            const obj = row
            for (let element in obj) {
                if (obj[element] === "فعال") {
                    obj[element] = true
                }
                else if (obj[element] === "غیر فعال") {
                    obj[element] = false
                }
            }
            const res = await deleteNewJob(JSON.parse(JSON.stringify([obj])))

            if (res.status === 200) {
                Notification.fire({
                    icon: 'success',
                    title: 'رکورد مورد نظر با موفقیت حذف گردید'
                })
                return true
            }
            else {
                Notification.fire({
                    icon: 'error',
                    title: 'رکورد مورد نظر با موفقیت حذف گردید'
                })
                return false;
            }
        }
    }

    render() {
        const { reloadGrid } = this.state
        return (
            <div class="col-lg-12 login-form" dir="rtl">
                {this.createForm()}
                <Grid
                    id={namespace.grid}
                    api={loadGird}
                    edit={this.editModal}
                    reload={reloadGrid}
                    reloaded={this.reloaded}
                    remove={this.removeGridRow}
                    columns={[
                        { title: 'date', showTitle: 'تاریخ', type: 'string', tableName: "GNR.tblpit", fieldName: "code" },
                        { title: 'startTime', showTitle: 'از ساعت', type: 'string', tableName: "GNR.tblpit", fieldName: "name" },
                        { title: 'endTime', showTitle: 'تا ساعت', type: 'string', tableName: "GNR.tblmine", fieldName: "name" },
                        { title: 'project', showTitle: 'پروژه', type: 'string', tableName: "GNR.tblmine", fieldName: "name" },
                        { title: 'WBS', showTitle: 'WBS', type: 'string', tableName: "GNR.tblmine", fieldName: "name" },
                        { title: 'activity', showTitle: 'کد فعالیت', type: 'string', tableName: "GNR.tblmine", fieldName: "name" },
                        { title: 'description', showTitle: 'شرح', type: 'string', tableName: "GNR.tblmine", fieldName: "name" },
                    ]}
                    pageSize={10} // 100 300 750 700 1000 1750
                />
            </div>
        );
    }
}
mapStore(CreateDaily)

export default CreateDaily;