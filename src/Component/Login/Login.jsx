import React, { Component, Fragment } from 'react';


class Login extends Component {
    state = {}
    render() {
        return (
            <Fragment>
                <div class="container">
                    <div className="login-header col-10">
                        <strong className="first-text-head">B</strong>
                        <strong className="second-text-head">arsam</strong>
                        <strong className="first-text-head">R</strong>
                        <strong className="second-text-head">ayan</strong>
                    </div>
                    <div class="row">
                        <div class="col-lg-3 col-md-2"></div>
                        <div class="col-lg-6 col-md-8 login-box">
                            <div class="col-lg-12 login-key">
                                <i class="fa fa-key" aria-hidden="true"></i>
                            </div>
                            <div class="col-lg-12 login-title">
                                پنل کاربری
                           </div>
                            <div class="col-lg-12 login-form">
                                <div class="col-lg-12 login-form">
                                    <form>
                                        <div class="form-group">
                                            <label class="form-control-label">نام کاربری</label>
                                            <input type="text" class="form-control" />
                                        </div>
                                        <div class="form-group">
                                            <label class="form-control-label">رمز عبور</label>
                                            <input type="password" class="form-control" i />
                                        </div>
                                        <div class="col-lg-12 loginbttm">
                                            <div class="col-lg-6 login-btm login-text">
                                                .
                                            </div>
                                            <div class="col-lg-6 login-btm login-button">
                                                <a href="/app"><button type="submit" class="btn btn-outline-primary pl-3 pr-3 pt-2 pb-2 ">ورود</button></a>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-2"></div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Login;