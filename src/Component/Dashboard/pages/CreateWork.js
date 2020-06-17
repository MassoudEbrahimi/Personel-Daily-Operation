import React, { Component } from 'react';
import "./CreateWork.css"



class CreateDaily extends Component {
    state = {}
    render() {
        return (
            <div class="col-lg-12 login-form" dir="rtl">
                <div class="col-lg-12 login-form">
                    <form onSubmit={this.Login}>
                        <div className="row d-flex col-12">
                            <div class="form-group d-flex  col-4">
                                <label class="form-control-label  col-3">نام کاربری</label>
                                <input type="text" class="form-control-sm   no-outline col-9" />
                            </div>
                            <div class="form-group d-flex  col-4">
                                <label class="form-control-label  col-3">رمز عبور</label><br />
                                <input type="password" class=" form-control-sm no-outline col-9" />
                            </div>
                            {/* <div class="col-lg-12 loginbttm">
                                <div class="col-lg-6 login-btm login-button">
                                    <a href="/app"><button type="submit" class="btn btn-outline-primary pl-3 pr-3 pt-2 pb-2 ">ورود</button></a>
                                </div>
                            </div> */}
                            <div className="form-group d-flex col-4">
                                <label className="form-control-label  col-3"> فعالیت</label>
                                <select className="form-control-sm col-9">
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                </select>
                            </div>
                            <div className="form-group d-flex col-4">
                                <label className="form-control-label  col-3"> فعالیت</label>
                                <select className="form-control-sm col-9">
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                </select>
                            </div>
                            <div className="form-group d-flex col-4">
                                <label className="form-control-label  col-3 "> فعالیت</label>
                                <select className="form-control-sm col-9">
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                    <option>1</option>
                                </select>
                            </div>
                            <div className="form-group d-flex col-4 ">
                                <label className="form-control-label col-3"> توضیحات</label>
                                <textarea className="col-9" rows="3" cols="50" style={{ resize: "none" }} placeholder="">

                                </textarea>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateDaily;