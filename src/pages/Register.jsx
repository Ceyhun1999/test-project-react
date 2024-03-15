import { useState } from "react";
import Wrapper from "../assets/wrappers/RegisterPage";
import { FormRow, Logo } from "../components";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: false,
};

function Register() {
    const [values, setValues] = useState(initialState);
    const { user, isLoading } = useSelector((state) => state.user);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setValues({ ...values, [name]: value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const { name, email, password, isMember } = values;
        if (!email || !password || (!isMember && !name)) {
            toast.error("Please fill out all fields");
        }
    };

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember });
    };

    return (
        <Wrapper className="full-page">
            <form className="form" onSubmit={onSubmit}>
                <Logo />
                <h3>{values.isMember ? "Login" : "Register"}</h3>
                {!values.isMember && (
                    <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />
                )}
                <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
                <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
                <button type="submit" className="btn btn-block">
                    submit
                </button>
                <p>
                    {values.isMember ? "Not a member yet?" : "Already a member?"}
                    <button className="member-btn" type="button" onClick={toggleMember}>
                        {values.isMember ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </Wrapper>
    );
}

export default Register;
