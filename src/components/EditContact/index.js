import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router";

const EditContact = ({ contacts, EditContact }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentContact = contacts.find(
    (contact) => contact.id === parseInt(id)
  );

  useEffect(() => {
    setFirstName(currentContact.firstName);
    setLastName(currentContact.lastName);
    setEmail(currentContact.email);
    setPhone(currentContact.phone);
    setCompanyName(currentContact.companyName);

  }, [currentContact]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkContactEmailExists = contacts.filter((contact) =>
      contact.email === email && contact.id !== currentContact.id
        ? contact
        : null
    );
    const checkContactPhoneExists = contacts.filter((contact) =>
      contact.phone === phone && contact.id !== currentContact.id
        ? contact
        : null
    );

    if (!email || !firstName || !lastName || !phone || !companyName) {
      return alert("Please fill in all fields!!");
    }
    if (checkContactEmailExists.length > 0) {
      return alert("This email already exists!!");
    }
    if (checkContactPhoneExists.length > 0) {
      return alert("This phone number already exists!!");
    }

    const data = {
      id: currentContact.id,
      email,
      firstName,
      lastName,
      companyName,
      phone,
    };

    EditContact(data);
    history.push("/");
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex flex-column">
        <button
          
          onClick={() => history.push("/")}
          style={{margin: '40px 92px 40px 303px', width: '50%'}}
        >
        Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentContact ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  className="form-control"
                  value={firstName}
                  placeholder={"First name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={lastName}
                  placeholder={"Last name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={companyName}
                  placeholder={"Company name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={email}
                  placeholder={"Email"}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  value={phone}
                  placeholder={"Phone"}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Contact
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.push("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Contact Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  contacts: state,
});
const mapDispatchToProps = (dispatch) => ({
  updateContact: (data) => {
    dispatch({ type: "UPDATE_CONTACT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditContact);
