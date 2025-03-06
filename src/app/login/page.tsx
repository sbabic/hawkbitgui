import LoginForm from './components/login-form';
import styles from './styles.module.scss';
import Image from "next/image";

export default function Login() {
    return (
        <div className={`${styles.page}`}>
            <div className={`${styles.logoSection}`}>
                <div className={`${styles.logoContainer}`}>
                    <Image width={308} height={142} className={styles.logo} alt={'Hawkbit Logo'} src={'/images/hawkbit-logo.svg'}/>
                </div>
                <div className={styles.policiesSection}>
                    <div>
                        <a href={'https://www.eclipse.org/legal/privacy/'}>Privacy Policy</a>
                        <p>|</p>
                        <a href={'https://www.eclipse.org/legal/terms-of-use/'}>Terms of Use</a>
                        <p>|</p>
                        <a href={'https://www.eclipse.org/legal/copyright/'}>Copyright Agent</a>
                    </div>
                    <div>
                        <a href={'https://www.eclipse.org/legal/epl-2.0/'}>Eclipse Public License</a>
                        <p>|</p>
                        <a href={'https://www.eclipse.org/legal/'}>Legal Resources</a>
                    </div>
                    <div>
                        <p>Copyright © Eclipse Foundation, Inc. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
            <div className={`${styles.loginSection}`}>
                <LoginForm className={styles.form}/>
                <div className={styles.policiesSection}>
                    <div>
                        <a href={'https://www.eclipse.org/org/'}>About Us</a>
                        <p>|</p>
                        <a href={'https://www.eclipse.org/org/foundation/contact.php'}>Contact Us</a>
                        <p>|</p>
                        <a href={'https://www.eclipse.org/donate'}>Donate</a>
                        <p>|</p>
                        <a href={'https://www.eclipse.org/org/documents/'}>Governance</a>
                    </div>
                </div>
            </div>
        </div>
    );
}