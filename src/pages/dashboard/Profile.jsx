import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import FormRow from "../../components/FormRow";
import { useState } from "react";
import { toast } from "react-toastify";

function Profile() {
    const { isLoading, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        lastName: user?.lastName || "",
        location: user?.location || "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, lastName, location } = userData;
        if (!userData.name || !userData.email || !userData.lastName || !userData.location) {
            toast.error("please fill out all fields");
            return;
        }
    };

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserData({ ...user, [name]: value });
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={handleSubmit}>
                <h3>profile</h3>
                <div className="form-center">
                    <FormRow type="text" name="name" value={userData.name} handleChange={handleChange} />

                    <FormRow type="text" name="lastName" value={userData.lastName} handleChange={handleChange} />

                    <FormRow type="email" name="email" value={userData.email} handleChange={handleChange} />

                    <FormRow type="text" name="location" value={userData.location} handleChange={handleChange} />
                    <button type="submit" disabled={isLoading} className="btn btn-block">
                        {isLoading ? "Please Wait..." : "save changes"}
                    </button>
                </div>
            </form>
        </Wrapper>
    );
}

export default Profile;
