import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader/Loader";
const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleClick = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"> <Loader /> </div>;
  }

  return (
    <div className="py-12">
      <section className="pt-24">
        <div className="px-12 mx-auto max-w-7xl">
          <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
              <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-green-400 to-purple-500 lg:inline">
                AI-Powered
              </span>{" "}
              <span className="text-white"> Mock Interviews</span> <span></span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-200 md:text-xl lg:px-24">
              Take your interview prep to the next level with AI-driven mock interviews. Get instant feedback, improve your communication skills, and boost your confidence—all in a realistic interview setting.
            </p>
            <div className="mb-4  md:mb-8">
              <button onClick={handleClick} className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-green-400 rounded-2xl sm:w-auto sm:mb-0">
                Get Started
                <svg
                  className="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="w-full mx-auto mt-20 text-center md:w-10/12"></div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="container">
          <div className="max-w-2xl text-center mx-auto"></div>
          <div className="mt-2 shadow-lg relative max-w-5xl mx-auto">
            <img
              src="/interface.png"
              className="rounded-xl"
              alt="Image Description"
            />
            <div className="absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-primary-foreground via-primary-foreground to-background p-px rounded-lg">
              <div className="w-48 h-48 rounded-lg bg-background/10" />
            </div>
            <div className="absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-primary-foreground via-primary-foreground to-background p-px rounded-full">
              <div className="w-48 h-48 rounded-full bg-background/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
