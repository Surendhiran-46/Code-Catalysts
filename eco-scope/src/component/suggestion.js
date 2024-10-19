

// import React, { useState } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";

// function Sugess() {
//   const [energyConsumption, setEnergyConsumption] = useState(""); // User input for energy consumption
//   const [waterUsage, setWaterUsage] = useState(""); // User input for water usage
//   const [carbonEmissions, setCarbonEmissions] = useState(""); // User input for carbon emissions
//   const [analysis, setAnalysis] = useState(""); // Store the AI-generated analysis
//   const [loading, setLoading] = useState(false); // To handle loading state
//   const [error, setError] = useState(""); // To handle error state
//   const [fileName, setFileName] = useState(""); // To handle custom file name
//   // Async function to make the API request
//   async function generateAnalysis() {
//     setLoading(true); // Set loading state to true when API call starts
//     setError(""); // Clear any previous errors

//     // Best and worst-case values for comparison
//     const bestCaseEnergy = 0; // Best case: renewable sources with minimal energy consumption
//     const worstCaseEnergy = 200; // Worst case: traditional energy sources (high consumption)
    
//     const bestCaseWater = 0; // Best case: waterless process
//     const worstCaseWater = 20000; // Worst case: water-intensive processes
    
//     const bestCaseCarbon = 0; // Best case: zero emissions (renewable sources)
//     const worstCaseCarbon = 1050; // Worst case: carbon-heavy energy sources

//     // Create a detailed query asking for a single analysis that covers all three factors together
//     const query = `Analyze the environmental impact based on the input values for Energy Consumption, Water Usage, and Carbon Emissions.
//     Compare the following with the best and worst-case scenarios and provide a unified analysis:

//     1. **Energy Consumption: ${energyConsumption} kWh**
//     - Best case scenario: ${bestCaseEnergy} kWh (renewable energy sources).
//     - Worst case scenario: ${worstCaseEnergy} kWh (traditional energy sources).

//     2. **Water Usage: ${waterUsage} liters**
//     - Best case scenario: ${bestCaseWater} liters (waterless processes).
//     - Worst case scenario: ${worstCaseWater} liters (water-intensive processes like beef production).

//     3. **Carbon Emissions: ${carbonEmissions} gCO₂/kWh**
//     - Best case scenario: ${bestCaseCarbon} gCO₂/kWh (zero emissions, renewable energy).
//     - Worst case scenario: ${worstCaseCarbon} gCO₂/kWh (high emissions, traditional energy).

//     Provide a single analysis that compares these three factors to the best and worst-case scenarios. The analysis should evaluate:
//     - How the current values compare to both extremes (best and worst case).
//     - Whether the current values are closer to the best-case scenario (environmentally friendly) or the worst-case scenario (harmful).`;

//     try {
//       const response = await axios({
//         url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBfwdk28f9zn3_Pjb2JcaTazh7w-mLwFcU",
//         method: "post",
//         data: {
//           contents: [
//             {
//               parts: [
//                 { text: query }, // Sending the formatted query to the API
//               ],
//             },
//           ],
//         },
//       });

//       console.log("API Response: ", response);

//       if (response.data && response.data.candidates && response.data.candidates.length > 0) {
//         const generatedAnalysis = response.data.candidates[0].content.parts[0].text;
//         setAnalysis(generatedAnalysis); // Store the generated analysis in state
//       } else {
//         setError("No valid response from the API. Please check your input or the API key.");
//       }
//     } catch (error) {
//       console.error("Error fetching AI response", error);
//       setError("An error occurred while fetching the response. Please check the network or API key.");
//     } finally {
//       setLoading(false); // Set loading state to false after the API call finishes
//     }
//   }
//   const exportToPDF = () => {
//     if (!analysis) {
//       alert("Please generate the analysis before exporting.");
//       return;
//     }

//     const doc = new jsPDF();

//     // Add content to the PDF
//     doc.setFontSize(16);
//     doc.text("Environmental Impact Analysis", 10, 10);
//     doc.setFontSize(12);
//     doc.text(analysis, 10, 20);

//     // If no file name is provided, default to "Environmental_Analysis.pdf"
//     const pdfFileName = fileName ? `${fileName}.pdf` : "Environmental_Analysis.pdf";
//     doc.save(pdfFileName); // Save the PDF with the given or default name
//   };

//   return (
//     <div style={styles.container}>
//         <h1>AI Provided Feedback</h1>
//       <h1>Environmental Impact Analysis</h1>

//       <div>
//         <label>Energy Consumption (kWh):</label>
//         <input
//           type="number"
//           value={energyConsumption}
//           onChange={(e) => setEnergyConsumption(e.target.value)}
//           placeholder="Enter energy consumption in kWh"
//           style={styles.input}
//         />
//       </div>

//       <div>
//         <label>Water Usage (liters):</label>
//         <input
//           type="number"
//           value={waterUsage}
//           onChange={(e) => setWaterUsage(e.target.value)}
//           placeholder="Enter water usage in liters"
//           style={styles.input}
//         />
//       </div>

//       <div>
//         <label>Carbon Emissions (gCO₂/kWh):</label>
//         <input
//           type="number"
//           value={carbonEmissions}
//           onChange={(e) => setCarbonEmissions(e.target.value)}
//           placeholder="Enter carbon emissions in gCO₂/kWh"
//           style={styles.input}
//         />
//       </div>

//       <br />

//       <button onClick={generateAnalysis} disabled={loading} style={styles.button}>
//         {loading ? "Generating..." : "Generate Environmental Analysis"}
//       </button>

//       <div>
//         {error && <p style={styles.error}>{error}</p>}

//         {analysis && (
//           <div>
//             <h3>Generated Analysis and Suggestions:</h3>
//             <pre style={styles.pre}>{analysis}</pre>
//           </div>
//         )}
//         <br />

//         {/* Input for file name */}
//         <div>
//           <label>File Name:</label>
//           <input
//             type="text"
//             value={fileName}
//             onChange={(e) => setFileName(e.target.value)}
//             placeholder="Enter custom file name (without .pdf)"
//             style={styles.input}
//           />
//         </div>

//         {/* Export to PDF button */}
//         <button onClick={exportToPDF} style={styles.button}>
//           Export as PDF
//         </button>
//       </div>
//     </div>
//   );
// }

// // CSS in JS for styling
// const styles = {
//   container: {
//     maxWidth: '800px',
//     margin: '0 auto',
//     padding: '20px',
//     backgroundColor: '#f4f7fa',
//     borderRadius: '8px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     marginBottom: '15px',
//     border: '1px solid #ccc',
//     borderRadius: '4px',
//     fontSize: '16px',
//     color: '#333',
//   },
//   button: {
//     width: '100%',
//     padding: '12px',
//     backgroundColor: '#3498db',
//     color: 'white',
//     border: 'none',
//     borderRadius: '4px',
//     fontSize: '16px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s ease',
//   },
//   buttonDisabled: {
//     backgroundColor: '#bbb',
//     cursor: 'not-allowed',
//   },
//   buttonHover: {
//     backgroundColor: '#2980b9',
//   },
//   pre: {
//     backgroundColor: '#f1f1f1',
//     padding: '15px',
//     borderRadius: '4px',
//     fontSize: '16px',
//     overflow: 'auto',
//     whiteSpace: 'pre-wrap',
//     wordWrap: 'break-word',
//   },
//   error: {
//     color: 'red',
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop: '20px',
//   },
// };

// export default Sugess;

import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import leavesImage from "../assests/leaves.jpg"; // Import the image
import Navbar from "./NavBar";

function Sugess() {
  const [energyConsumption, setEnergyConsumption] = useState("");
  const [waterUsage, setWaterUsage] = useState("");
  const [carbonEmissions, setCarbonEmissions] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const [fileName, setFileName] = useState("");
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalMessage, setModalMessage] = useState(""); // Store modal message

  // Define max limits
  const MAX_ENERGY = 200; // kWh
  const MAX_WATER = 20000; // liters
  const MAX_CARBON = 1050; // gCO₂/kWh

  // Function to check max limits and show modal with a message
  const checkMaxLimit = (value, maxLimit, fieldName) => {
    if (value > maxLimit) {
      let suggestion = "";

      // Provide suggestions based on which field is exceeded
      switch (fieldName) {
        case "Energy Consumption":
          suggestion = "Consider using renewable energy sources or improving energy efficiency to lower consumption.";
          break;
        case "Water Usage":
          suggestion = "Look into water-saving techniques or alternative processes that require less water.";
          break;
        case "Carbon Emissions":
          suggestion = "Switch to low-carbon technologies or optimize processes to reduce emissions.";
          break;
        default:
          suggestion = "Please review your inputs and try again.";
      }

      setModalMessage(`${fieldName} has exceeded the maximum limit. ${suggestion}`);
      setShowModal(true); // Show modal if limit is exceeded
      return true;
    }
    return false;
  };

  // Async function to make the API request
  async function generateAnalysis() {
    setLoading(true);
    setError("");
    setFieldError("");

    if (!energyConsumption || !waterUsage || !carbonEmissions) {
      setFieldError("Please fill all fields to generate the analysis.");
      setLoading(false);
      return;
    }

    if (
      checkMaxLimit(energyConsumption, MAX_ENERGY, "Energy Consumption") ||
      checkMaxLimit(waterUsage, MAX_WATER, "Water Usage") ||
      checkMaxLimit(carbonEmissions, MAX_CARBON, "Carbon Emissions")
    ) {
      setLoading(false);
      return;
    }
    const bestCaseEnergy = 0; // Best case: renewable sources with minimal energy consumption
     const worstCaseEnergy = 200; // Worst case: traditional energy sources (high consumption)
    
    const bestCaseWater = 0; // Best case: waterless process
    const worstCaseWater = 20000; // Worst case: water-intensive processes
    
    const bestCaseCarbon = 0; // Best case: zero emissions (renewable sources)
    const worstCaseCarbon = 1050;

    const query = `Analyze the environmental impact based on the input values for Energy Consumption, Water Usage, and Carbon Emissions.
   Compare the following with the best and worst-case scenarios and provide a unified analysis:

    1. Energy Consumption: ${energyConsumption} kWh
     - Best case scenario: ${bestCaseEnergy} kWh (renewable energy sources).
    - Worst case scenario: ${worstCaseEnergy} kWh (traditional energy sources).

     2. Water Usage: ${waterUsage} liters
     - Best case scenario: ${bestCaseWater} liters (waterless processes).
    - Worst case scenario: ${worstCaseWater} liters (water-intensive processes like beef production).

     3. Carbon Emissions: ${carbonEmissions} gCO₂/kWh
   - Best case scenario: ${bestCaseCarbon} gCO₂/kWh (zero emissions, renewable energy).
     - Worst case scenario: ${worstCaseCarbon} gCO₂/kWh (high emissions, traditional energy).

     Provide a single analysis that compares these three factors to the best and worst-case scenarios. The analysis should evaluate:
     - How the current values compare to both extremes (best and worst case).
     - Whether the current values are closer to the best-case scenario (environmentally friendly) or the worst-case scenario (harmful).`;

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyBfwdk28f9zn3_Pjb2JcaTazh7w-mLwFcU",
        method: "post",
        data: {
          contents: [
            {
              parts: [
                { text: query },
              ],
            },
          ],
        },
      });

      if (response.data && response.data.candidates && response.data.candidates.length > 0) {
        const generatedAnalysis = response.data.candidates[0].content.parts[0].text;
        setAnalysis(generatedAnalysis);
      } else {
        setError("No valid response from the API. Please check your input or the API key.");
      }
    } catch (error) {
      setError("An error occurred while fetching the response.");
    } finally {
      setLoading(false);
    }
  }

  const exportToPDF = () => {
    if (!analysis) {
      alert("Please generate the analysis before exporting.");
      return;
    }

    const doc = new jsPDF();

    // Add content to the PDF
    doc.setFontSize(16);
    doc.text("Environmental Impact Analysis", 10, 10);
    doc.setFontSize(10);
    const maxWidth = 180; // Adjust this width to fit more text
    doc.text(analysis, 10, 30, { maxWidth: maxWidth });

    // If no file name is provided, default to "Environmental_Analysis.pdf"
    const pdfFileName = fileName ? `${fileName}.pdf` : "Environmental_Analysis.pdf";
    doc.save(pdfFileName); // Save the PDF with the given or default name
  };

  // Close the modal
  const closeModal = () => setShowModal(false);

  return (
    <div style={styles.wrapper}>
      <Navbar />
      <div style={styles.container}>
        <h1>Environmental Impact Analysis</h1>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Energy Consumption (kWh):</label>
          <input
            type="number"
            value={energyConsumption}
            onChange={(e) => setEnergyConsumption(e.target.value)}
            placeholder="Enter energy consumption in kWh"
            style={styles.input}
            step="any"
            min="0"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Carbon Emissions (gCO₂/kWh):</label>
          <input
            type="number"
            value={carbonEmissions}
            onChange={(e) => setCarbonEmissions(e.target.value)}
            placeholder="Enter carbon emissions in gCO₂/kWh"
            style={styles.input}
            step="any"
            min="0"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Water Usage (liters):</label>
          <input
            type="number"
            value={waterUsage}
            onChange={(e) => setWaterUsage(e.target.value)}
            placeholder="Enter water usage in liters"
            style={styles.input}
            step="any"
            min="0"
            onWheel={(e) => e.target.blur()}
          />
        </div>

        {fieldError && <p style={styles.fieldError}>{fieldError}</p>}

        <button
          onClick={generateAnalysis}
          disabled={loading}
          style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        >
          {loading ? "Generating..." : "Generate Environmental Analysis"}
        </button>

        <div>
          {error && <p style={styles.error}>{error}</p>}

          {analysis && (
            <div>
              <h3>Generated Analysis and Suggestions:</h3>
              <pre style={styles.pre}>{analysis}</pre>
            </div>
          )}

          <div style={{ margin: '20px 0px' }}>
            <label>File Name:</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter custom file name (without .pdf)"
              style={styles.input}
            />
          </div>

          <button onClick={exportToPDF} style={styles.button}>
            Export as PDF
          </button>
        </div>
      </div>

      {/* Modal for alerts */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>⚠ Alert</h2>
            <p style={styles.modalMessage}>{modalMessage}</p>
            <button onClick={closeModal} style={styles.modalButton}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    backgroundImage: `url(${leavesImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    padding: '20px',
  },
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop:'70px',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    boxShadow: '0 4px 20px rgba(0, 255, 0, 0.4)',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  label: {
    flex: '1',
    marginRight: '10px',
    fontSize: '16px',
    color: '#333',
  },
  input: {
    flex: '2',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    color: '#333',
    appearance: 'textfield',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
  },
  buttonDisabled: {
    backgroundColor: '#bbb',
    cursor: 'not-allowed',
  },
  pre: {
    backgroundColor: '#f1f1f1',
    padding: '15px',
    borderRadius: '4px',
    fontSize: '16px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '20px',
  },
  fieldError: {
    color: 'orange',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    maxWidth: '400px',
    width: '100%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
  },
  modalTitle: {
    fontSize: '24px',
    marginBottom: '15px',
    color: 'red', 
  },
  modalMessage: {
    fontSize: '16px',
    marginBottom: '15px',
  },
  modalButton: {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Sugess;