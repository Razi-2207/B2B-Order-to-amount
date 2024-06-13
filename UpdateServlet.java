package com.highradius.servlets;

import com.highradius.connection.DatabaseConnection;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/edit/*")
public class UpdateServlet extends HttpServlet {
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
    protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
    	
    	setResponseHeaders(resp);
        // Extract the invoice ID from the URL path
        String pathInfo = req.getPathInfo();
        String[] pathSegments = pathInfo.split("/");
        int invoiceId = Integer.parseInt(pathSegments[1]); // Assuming the invoice ID is at index 1

        // Get the edited field values from the request parameters
        String editedOrderCurrency = req.getParameter("orderCurrency");
        int editedCompanyCode =  Integer.parseInt(req.getParameter("companyCode"));
        String editedDistributionChannel = req.getParameter("distributionChannel");

        // Update the invoice in the database using the DatabaseConnection object
        databaseConnection.updateInvoice(invoiceId, editedOrderCurrency, editedCompanyCode, editedDistributionChannel);

        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write("{\"message\": \"Invoice updated successfully\"}");
    }
    
    private void setResponseHeaders(HttpServletResponse resp) {
    	resp.addHeader("Access-Control-Allow-Origin", "*");
        resp.addHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, HEAD");
        resp.addHeader("Access-Control-Allow-Headers", "X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept");
        resp.addHeader("Access-Control-Max-Age", "1728000");
    }
}