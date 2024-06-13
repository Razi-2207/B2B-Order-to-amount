package com.highradius.servlets;

import com.highradius.connection.DatabaseConnection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/delete/*")
public class DeleteServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private DatabaseConnection databaseConnection;

    @Override
    public void init() throws ServletException {
        super.init();
        databaseConnection = new DatabaseConnection();
    }
    
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) {
        setResponseHeaders(resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        setResponseHeaders(resp);

        // Extract the parameter from the URL path
        String pathInfo = req.getPathInfo();
        String[] pathSegments = pathInfo.split("/");
        String slNos = pathSegments[1]; // Assuming the parameter is at index 1

        // Split the comma-separated values into an array
        String[] slNoArray = slNos.split(",");
        
        // Loop through each slNo and delete the corresponding invoice
        for (String slNoStr : slNoArray) {
            int slNo = Integer.parseInt(slNoStr);
            databaseConnection.deleteInvoice(slNo);
        }

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write("{\"message\": \"Invoice(s) deleted successfully\"}");
    }

    
    private void setResponseHeaders(HttpServletResponse resp) {
    	resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
        resp.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
        resp.addHeader("Access-Control-Max-Age", "1728000");
    }
}