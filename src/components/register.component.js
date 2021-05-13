import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Select from 'react-select';
import CheckButton from "react-validation/build/button";
import axios from "axios";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const ventityname= value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Enityname must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const vfirstname= value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The First Name must be between 3 and 20 characters.
      </div>
    );
  }
};

const vlastname= value => {
  if (value.length < 1 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Last Name must be between 1 and 20 characters.
      </div>
    );
  }
};

const vphonenumber= value => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The Phone Number must be between 5 and 20 characters.
      </div>
    );
  }
};

const vaddressline1= value => {
  if (value.length < 5 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The address line must be between 5 and 20 characters.
      </div>
    );
  }
};

const vcity= value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The City must be between 2 and 20 characters.
      </div>
    );
  }
};

const vpobox= value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The PoBox must be between 2 and 20 characters.
      </div>
    );
  }
};

const vstate= value => {
  if (value.length < 2 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The State must be between 2 and 20 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeEntityname = this.onChangeEntityname.bind(this);
    this.onChangeFirstName = this.onChangeFirstName.bind(this);
    this.onChangeLastName = this.onChangeLastName.bind(this);
    this.onChangePhoneNumber =this.onChangePhoneNumber.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.onChangeAddress1 = this.onChangeAddress1.bind(this);
    this.onChangeAddress2 = this.onChangeAddress2.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangePOBox =  this.onChangePOBox.bind(this);
    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleLanguageChange = this.handleLanguageChange.bind(this);
    this.onChangeStateProvince = this.onChangeStateProvince.bind(this);
    this.state = {
      userName: "",
      contact:{
      organizationName: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber:"",
      address1:"",
      address2:"",
      city:"",
      stateProvince:"",
      postalCode:"",
      countryCode:""
      },
      languageCode:"",
      currencyCode:"",
      password:"",
      confirmpassword: "",
      successful: false,
      message: "",
      selectCountryOptions : [],
      countryName: '',
      selectLanguageOptions : [],
      languageName: '',
      selectCurrencyOptions : [],
      currencyName: "",
      validConfirmPassword:"",
      countryMandatory:"",
      cityMandatory:"",
      currencyMandatory:""
    };
  }

  async getLanguageOptions(){
    const res = await axios.get('http://localhost:8080/api/util/languages')
    const data = res.data

    const options = data.map(d => ({
      "value" : d[1],
      "label" : d[2]
    }))
    this.setState({selectLanguageOptions: options})
  }

  async getCountryOptions(){
    const res = await axios.get('http://localhost:8080/api/util/countries')
    const data = res.data

    const options = data.map(d => ({
      "value" : d.code,
      "label" : d.description
    }))
    this.setState({selectCountryOptions: options})
  }

  async getCurrencyOptions(){
    const res = await axios.get('http://localhost:8080/api/util/currencies')
    const data = res.data

    const options = data.map(d => ({
      "value" : d[1],
      "label" : d[2]
    }))
    this.setState({selectCurrencyOptions: options})
  }

   componentDidMount(){
     this.getCountryOptions();
     this.getLanguageOptions();
     this.getCurrencyOptions();
   }

  handleCurrencyChange(e){
    this.setState({currencyCode:e.value, currencyName:e.label,currencyMandatory:""})
   }

  handleCountryChange(e){
    this.setState(
              {contact:{ ...this.state.contact, countryCode:e.value},countryName:e.label,countryMandatory:""}
            )
   }

   handleLanguageChange(e){
    this.setState({languageCode:e.value, languageName:e.label,languageMandatory:""})
   }

  onChangeEntityname(e) {
    this.setState({
      contact:{ ...this.state.contact, organizationName: e.target.value}
    });
  }
  onChangeUsername(e) {
    this.setState({
      userName: e.target.value
    });
  }
  onChangeFirstName(e) {
    this.setState({
      contact:{ ...this.state.contact, firstName: e.target.value}
    });
  }
  onChangeLastName(e) {
    this.setState({
      contact:{ ...this.state.contact, lastName: e.target.value}
    });
  }
  onChangeEmail(e) {
    this.setState({
      contact:{ ...this.state.contact, email: e.target.value}
    });
  }
  onChangePhoneNumber(e) {
    this.setState({
      contact:{ ...this.state.contact, phoneNumber: e.target.value}
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  onChangeConfirmPassword(e) {
    this.setState({
      confirmpassword: e.target.value,validConfirmPassword:""
    });
  }
  onChangeAddress1(e) {
    this.setState({
      contact:{ ...this.state.contact, address1: e.target.value}
    });
  }
  onChangeAddress2(e) {
    this.setState({
      contact:{ ...this.state.contact, address2: e.target.value}
    });
  }
  onChangeCity(e) {
    this.setState({
      contact:{ ...this.state.contact, city: e.target.value}
    });
  }
  onChangePOBox(e) {
    this.setState({
      contact:{ ...this.state.contact, postalCode: e.target.value}
    });
  }
  onChangeStateProvince(e) {
    this.setState({
      contact:{ ...this.state.contact, stateProvince: e.target.value}
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
    });

    this.form.validateAll();
    let myArr= [];
    if(this.state.password!==this.state.confirmpassword){
      myArr.push("Confirm password not match with Password")
      this.setState({
        myArr,
        validConfirmPassword:"Confirm password not match with Password"
      });
    }else{
      this.setState({
        validConfirmPassword:""
      });
    }
    if(this.state.contact.countryCode==="undefined"||this.state.contact.countryCode.length===0){
      myArr.push("Confirm password not match with Password")
       this.setState({
        myArr,
        countryMandatory:"Country should be selected"
      });
    }else{
      this.setState({
        countryMandatory:""
      });

    }
    if(this.state.currencyCode==="undefined"||this.state.currencyCode.length===0){
      myArr.push("Confirm password not match with Password")
      this.setState({
        myArr,
        currencyMandatory:"Currency should be selected"
      });
    }else{
      this.setState({
        currencyMandatory:""
      });
    }
   if(this.state.languageCode==="undefined"||this.state.languageCode.length===0){
    myArr.push("Confirm password not match with Password")
    this.setState({
      myArr,
      languageMandatory:"Language should be selected"
    });
   }else{
    this.setState({
      languageMandatory:""
    });
   }
    alert(myArr.length);
    if (this.checkBtn.context._errors.length === 0&&myArr.length===0) {
      AuthService.register(
        this.state.userName,
        this.state.contact,
        this.state.password,
        this.state.languageCode,
        this.state.currencyCode
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    
    return (
      <div className="col-md-12">
        <div className="card cardreg-container">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="username" class="required">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="organizationName" class="required">Organization Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="organizationName"
                    value={this.state.contact.organizationName}
                    onChange={this.onChangeEntityname}
                    validations={[required, ventityname]}
                  />
                   </div>
                </div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="firstname" class="required">First Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.contact.firstName}
                    onChange={this.onChangeFirstName}
                    validations={[required, vfirstname]}
                  />
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="lastName" class="required">Last Name</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="lastName"
                    value={this.state.contact.lastName}
                    onChange={this.onChangeLastName}
                    validations={[required, vlastname]}
                  />
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="email" class="required">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.contact.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="phonenumber" class="required">Phone Number</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phonenumber"
                    value={this.state.phonenumber}
                    onChange={this.onChangePhoneNumber}
                    validations={[required, vphonenumber]}
                  />
                  </div>
                </div>

                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="password" class="required">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="confirmpassword" class="required">Confirm Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="confirmpassword"
                    id="confirmpassword"
                    value={this.state.confirmpassword}
                    onChange={this.onChangeConfirmPassword}
                    validations={[required, vpassword]}
                  />
                  <div className="text-danger">{this.state.validConfirmPassword}</div>
                  </div>
                  
                </div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="address1" class="required"> Address1</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address1"
                    value={this.state.contact.address1}
                    onChange={this.onChangeAddress1}
                    validations={[required, vaddressline1]}
                  />
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="address2">Address2</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="address2"
                    value={this.state.contact.address2}
                    onChange={this.onChangeAddress2}
                  />
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="city" class="required">City</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="city"
                    value={this.state.contact.city}
                    onChange={this.onChangeCity}
                    validations={[required, vcity]}
                  />
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="postalCode" class="required">PO Box</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    value={this.state.contact.postalCode}
                    onChange={this.onChangePOBox}
                    validations={[required, vpobox]}
                  />
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="country" class="required">Country</label>
                  <Select
                    options={this.state.selectCountryOptions}
                    name="country"
                    onChange={this.handleCountryChange}
                  />
                    <div className="text-danger">{this.state.countryMandatory}</div>
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="language" class="required">Language</label>
                  <Select
                    options={this.state.selectLanguageOptions}
                    name="language"
                    onChange={this.handleLanguageChange}
                  />
                    <div className="text-danger">{this.state.languageMandatory}</div>
                  </div>
                </div>
                <div className="form-group row">
                <div className="col-sm-6">
                  <label htmlFor="currency" class="required">Currency</label>
                  <Select
                    options={this.state.selectCurrencyOptions}
                    name="currency"
                    onChange={this.handleCurrencyChange}
                  />
                  <div className="text-danger">{this.state.currencyMandatory}</div>
                  </div>
                  <div className="col-sm-6">
                  <label htmlFor="stateProvince" class="required">State Province</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="stateProvince"
                    value={this.state.contact.stateProvince}
                    onChange={this.onChangeStateProvince}
                    validations={[required, vstate]}
                  />
                  </div>
                </div>
                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
