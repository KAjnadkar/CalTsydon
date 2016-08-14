package ksh.main.config;

import java.util.Properties;

import javax.sql.DataSource;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import ksh.main.ct.dao.ConversationDao;
import ksh.main.ct.dao.ConversationDaoImpl;
import ksh.main.ct.dao.MessageDao;
import ksh.main.ct.dao.MessageDaoImpl;

import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder;

@Configuration
@EnableTransactionManagement
@ComponentScan({ "ksh.main.controllers", "ksh.main.ct.dao", "ksh.main.models.ct" })
public class HibernateConfig {

	@Autowired
	@Bean(name = "sessionFactory")
	public SessionFactory getSessionFactory(DataSource dataSource) {

		LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(dataSource);
		sessionBuilder.scanPackages("ksh.main.controllers", "ksh.main.ct.dao", "ksh.main.models.ct");
		sessionBuilder.addProperties(hibernateProperties());

		return sessionBuilder.buildSessionFactory();
	}
     
    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setUrl("jdbc:mysql://localhost:3306/ct");
        dataSource.setUsername("dev");
        dataSource.setPassword("root");
        return dataSource;
    }
    
//    @Bean
//    public DataSource dataSource() {
//        DriverManagerDataSource dataSource = new DriverManagerDataSource();
//        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
//        dataSource.setUrl("jdbc:mysql://chat-honestly-rds-2.coyzbiu0d9ks.us-east-1.rds.amazonaws.com:3306/ct");
//        dataSource.setUsername("chathonestly");
//        dataSource.setPassword("rubmeharderplys");
//        return dataSource;
//    }
     
    private Properties hibernateProperties() {
        Properties properties = new Properties();
        properties.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        properties.put("hibernate.show_sql", "true");
        properties.put("hibernate.format_sql", "true");
        properties.setProperty("hibernate.hbm2ddl.auto", "create");
        return properties;        
    }
     
    @Bean(name = "transactionManager")
    @Autowired
    public HibernateTransactionManager transactionManager(SessionFactory s) {
       HibernateTransactionManager txManager = new HibernateTransactionManager();
       txManager.setSessionFactory(s);
       return txManager;
    }
    
    @Autowired
    @Bean(name = "conversationDao")
    public ConversationDao getConversationDao(SessionFactory sessionFactory) {
    	return new ConversationDaoImpl();
    }
    
    @Autowired
    @Bean(name = "messageDao")
    public MessageDao getMessageDao(SessionFactory sessionFactory) {
    	return new MessageDaoImpl();
    }
}