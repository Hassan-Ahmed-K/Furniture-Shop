import NavBar from "../../components/nav";
import Form from "./Form"
import promotion_img from "../../assets/bg-01.jpg";


const LoginPage = () =>{
    return (
      <>
        <NavBar />
        <section className="form_section">
          <div className="left_col">
            <img src={promotion_img} alt="" />
          </div>

            <div className="right_col">
                <Form />
            </div>
        </section>
      </>
    );

}

export default LoginPage;