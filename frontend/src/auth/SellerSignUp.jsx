import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

export default function SellerSignUp() {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);

      const response = await axios.patch(
        `http://localhost:3000/api/v1/user/upgrade-user/${userId}`,
        { contact },
        {
          withCredentials: true,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        dispatch(setUser(response.data.user));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create Your Account On Bidify
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact
              </label>
              <div className="mt-1">
                <input
                  id="contact"
                  name="contact"
                  type="contact"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                  autoComplete="contact"
                  className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="text-white font-bold text-2xl animate-spin" />{" "}
                    Signing Up...{" "}
                  </span>
                ) : (
                  "Sign up"
                )}
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to={"/sign-in"}
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Login here and explore
            </Link>
          </p>

          <p className=" mt-5 font-semibold leading-6 text-red-600">{error}</p>
        </div>
      </div>
    </>
  );
}
