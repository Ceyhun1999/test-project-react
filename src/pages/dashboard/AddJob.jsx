import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import FormRow from "../../components/FormRow";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddJob = () => {
    const {
        isLoading,
        position,
        company,
        jobLocation,
        jobType,
        jobTypeOptions,
        status,
        statusOptions,
        isEditing,
        editJobId,
    } = useSelector((state) => state.job);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !company || !jobLocation) {
            toast.error("Please fill out all fields");
            return;
        }
    };

    const handleJobInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
    };

    return (
        <Wrapper>
            <form className="form">
                <h3>{isEditing ? "edit job" : "add job"}</h3>
                <div className="form-center">
                    {/* position */}
                    <FormRow type="text" name="position" value={position} handleChange={handleJobInput} />
                    {/* company */}
                    <FormRow type="text" name="company" value={company} handleChange={handleJobInput} />
                    {/* jobLocation */}
                    <FormRow type="text" name="jobLocation" value={jobLocation} handleChange={handleJobInput} />
                    <div className="btn-container">
                        <button
                            className="btn btn-block clear-btn"
                            onClick={() => {
                                console.log("clear");
                            }}
                        >
                            clear
                        </button>
                        <button type="submit" className="btn btn-block clear-btn" onClick={handleSubmit}>
                            submit
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
};

export default AddJob;
