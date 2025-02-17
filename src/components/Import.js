import React from 'react'
import XLSX from "xlsx";

function Import() { 
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
    };
  
    const handleImportData = () => {
      const fileReader = new FileReader();
      fileReader.readAsBinaryString(file);
      fileReader.onload = (event) => {
        const binaryData = event.target.result;
        const workbook = XLSX.read(binaryData, { type: "binary" });
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);
  
        data.forEach((row) => {
          const sql = `INSERT INTO your-mysql-table-name (column1, column2, column3) VALUES ('${row.column1}', '${row.column2}', '${row.column3}')`;
          connection.query(sql, (error, results) => {
            if (error) {
              console.error(error);
            }
          });
        });
  
        connection.end();
      };
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileUpload} />
        <button onClick={handleImportData}>Import Data</button>
      </div>
    );
}

export default Import