import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });
  it('should call login and check if the api is working or not', () => {
    const httpMock = TestBed.inject(HttpTestingController)
    const mockResponse = [
      { id: 1, email: 'admin@deltaCapital', password: 'admin123', role: 'admin' }
    ];
    service.login('admin@deltaCapital', 'admin123').subscribe(users => {
      expect(users.length).toBe(1);
      expect(users[0].email).toBe('admin@deltaCapital');
    });
    const req = httpMock.expectOne(
      'http://localhost:3000/users?email=admin@deltaCapital&password=admin123'
    )
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });
  it('should set a user in local storage', () => {
    const mockUser =
      { id: 1, email: 'admin@deltaCapital', password: 'admin123', role: 'admin' };
    service.setUser(mockUser);
    expect(localStorage.getItem('currentUser')).toEqual(JSON.stringify(mockUser))
  })
  it('should get user', () => {
    const mockUser = { id: 1, email: 'admin@deltaCapital', password: 'admin123', role: 'admin' };
    service.setUser(mockUser);
    expect(service.getUser()).toEqual(mockUser)
  });
  it('should get role', () => {
    const mockUser = { id: 1, email: 'admin@deltaCapital', password: 'admin123', role: 'admin' };
    service.setUser(mockUser);
    expect(service.getRole()).toEqual('admin')
  });
  it('should remove user', () => {
    service.logout();
    expect(service.getRole()).toBeNull()
  })
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
