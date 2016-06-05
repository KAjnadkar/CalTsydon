package messages;

public class GreetingsFromServer {
	private String greeting;
	
	public String getGreeting() {
		return greeting;
	}

	public void setGreeting(String greeting) {
		this.greeting = greeting;
	}

	public GreetingsFromServer(String g) {
		this.greeting = g;
	}
	
}
