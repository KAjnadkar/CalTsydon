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
import ksh.main.models.ct.Conversation;

import org.springframework.orm.hibernate4.LocalSessionFactoryBean;
import org.springframework.orm.hibernate5.HibernateTransactionManager;
import org.springframework.orm.hibernate5.LocalSessionFactoryBuilder;

@Configuration
@EnableTransactionManagement
@ComponentScan({ "ksh.main.controllers", "ksh.main.ct.dao", "ksh.main.models.ct" })
public class HibernateConfig {
 
//    @Autowired
//    private Environment environment;
 
//    @Bean
//    public LocalSessionFactoryBean sessionFactory() {
//        LocalSessionFactoryBean sessionFactory = new LocalSessionFactoryBean();
//        sessionFactory.setDataSource(dataSource());
//        sessionFactory.setPackagesToScan(new String[] { "ksh.main.controllers", "ksh.main.ct.dao", "ksh.main.models.ct" });
//        sessionFactory.setHibernateProperties(hibernateProperties());
//        return sessionFactory;
//     }
	
	@Autowired
	@Bean(name = "sessionFactory")
	public SessionFactory getSessionFactory(DataSource dataSource) {

		LocalSessionFactoryBuilder sessionBuilder = new LocalSessionFactoryBuilder(dataSource);

		sessionBuilder.addAnnotatedClasses(Conversation.class);
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
}