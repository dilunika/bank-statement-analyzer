package org.jkd.prod.bsa;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

@Configuration
public class TestConfigurations {

	@Bean
	public DataSource dataSource() {
		
		DriverManagerDataSource ds = new DriverManagerDataSource();
		ds.setDriverClassName("org.h2.Driver");
		ds.setUrl("jdbc:h2:file:./src/main/resources/h2/db;DB_CLOSE_DELAY=-1");
		ds.setUsername("sa");
		ds.setPassword("");

		return ds;
	}
}
