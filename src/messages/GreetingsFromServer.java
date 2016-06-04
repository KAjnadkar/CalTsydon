package messages;

public class GreetingsFromServer {
	private String greetings;
	
	public GreetingsFromServer(String g) {
		this.greetings = g;
	}

	public String getGreetings() {
		return greetings;
	}

	public void setGreetings(String greetings) {
		this.greetings = greetings;
	}	
	
}
