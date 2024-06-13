package com.highradius.servlets;

import com.highradius.implementation.InvoiceDao;
import com.highradius.implementation.InvoiceDaoImpl;
import com.highradius.model.Invoice;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/add")
public class AddServlet extends HttpServlet {
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private InvoiceDao invoiceDao;

    @Override
    public void init() throws ServletException {
        super.init();
        invoiceDao = new InvoiceDaoImpl();
    }
    private int parseInteger(String value, int defaultValue) {
	    if (value != null && !value.trim().isEmpty()) {
	        try {
	            return Integer.parseInt(value.trim());
	        } catch (NumberFormatException e) {
	            // Handle parsing error if needed
	        }
	    }
	    return defaultValue;
	}

	private double parseDouble(String value, double defaultValue) {
	    if (value != null && !value.trim().isEmpty()) {
	        try {
	            return Double.parseDouble(value.trim());
	        } catch (NumberFormatException e) {
	            // Handle parsing error if needed
	        }
	    }
	    return defaultValue;
	}

	private String parseString(String value, String defaultValue) {
	    if (value != null) {
	        return value.trim();
	    }
	    return defaultValue;
	}
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
     
    	// Retrieve data from the request parameters
    	int slNo = parseInteger(req.getParameter("slNo"), 0);
    	int customerOrderID = parseInteger(req.getParameter("customerOrderID"), 0);
    	int salesOrg = parseInteger(req.getParameter("salesOrg"), 0);
    	String distributionChannel = parseString(req.getParameter("distributionChannel"), "");
    	int companyCode = parseInteger(req.getParameter("companyCode"), 0);
    	String orderCreationDate = parseString(req.getParameter("orderCreationDate"), "");
    	String orderCurrency = parseString(req.getParameter("orderCurrency"), "");
    	double amountInUSD = parseDouble(req.getParameter("amountInUSD"), 0.0);
    	double orderAmount = parseDouble(req.getParameter("orderAmount"), 0.0);
    	String division = parseString(req.getParameter("division"), "");
    	double releasedCreditValue = parseDouble(req.getParameter("releasedCreditValue"), 0.0);
    	String purchaseOrderType = parseString(req.getParameter("purchaseOrderType"), "");
    	String orderCreationTime = parseString(req.getParameter("orderCreationTime"), "");
    	String creditControlArea = parseString(req.getParameter("creditControlArea"), "");
    	int soldToParty = parseInteger(req.getParameter("soldToParty"), 0);
    	String requestedDeliveryDate = parseString(req.getParameter("requestedDeliveryDate"), "");
    	String creditStatus = parseString(req.getParameter("creditStatus"), "");
    	int customerNumber = parseInteger(req.getParameter("customerNumber"), 0);
    	String uniqueCustID = parseString(req.getParameter("uniqueCustID"), "");

    	// ...

    	
        // Create an Invoice object with the retrieved data
        Invoice invoice = new Invoice(slNo,customerOrderID, salesOrg, distributionChannel, division, releasedCreditValue,
                purchaseOrderType, companyCode, orderCreationDate, orderCreationTime, creditControlArea,
                soldToParty, orderAmount, requestedDeliveryDate, orderCurrency, creditStatus, customerNumber,
                amountInUSD, uniqueCustID);
        
        // Add the invoice to the database
        invoiceDao.insertInvoice(invoice);

        // Set the response type to JSON
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");

        // Create a JSON response
        Gson gson = new Gson();
        String json = gson.toJson("Success");

        // Send the JSON response
        PrintWriter out = resp.getWriter();
        out.print(json);
        out.flush();
    }
}