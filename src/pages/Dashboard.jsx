import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Background3D from "../components/Background3D";
const Dashboard = () => {
  return (
    <div className="container">
      <Navbar />
      <Background3D />
      <div className="glass-card" style={{ padding: "40px" }}>
        <h2 className="text-gradient">Dashboard</h2>
        <p>Coming soon: data visualizations, charts, sentiment logs!</p>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
