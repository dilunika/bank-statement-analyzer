package org.jkd.prod.bsa.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Statement {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private long id;
	
	private String accountNumber;
	
	private LocalDate fromDate;
	
	private LocalDate toDate;
	
	@OneToMany(cascade=CascadeType.ALL, fetch=FetchType.EAGER)
	private List<Transaction> transactions = new ArrayList<Transaction>();

	public long getId() {
		return id;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}

	public List<Transaction> getTransactions() {
		return transactions;
	}

	public void setTransactions(List<Transaction> transactions) {
		this.transactions = transactions;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	@Override
	public String toString() {
		return "Statement [id=" + id + ", accountNumber=" + accountNumber + ", fromDate=" + fromDate + ", toDate="
				+ toDate + ", transactions=" + transactions + "]";
	}
	
	
}
